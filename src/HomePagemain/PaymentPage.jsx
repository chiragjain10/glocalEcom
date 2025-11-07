import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaUpload, FaSpinner } from 'react-icons/fa';
import { FiChevronRight, FiCheck } from 'react-icons/fi';
import { useAuth } from '../Context/AuthContext';
import { ensureUserFromCheckout, placeCODOrder, placePaidOrder } from '../Context/PlaceOrder';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PaymentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Get order data from checkout
  const order = location.state?.order;
  const fromCheckout = location.state?.fromCheckout;

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error('Razorpay script failed to load');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    if (!window.Razorpay) {
      loadRazorpay();
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!fromCheckout || !order) {
      navigate('/checkout');
    }
  }, [fromCheckout, order, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Order Found</h2>
          <p className="text-gray-600 mb-6">Please complete checkout first</p>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToFirebase = async () => {
    if (uploadedImages.length === 0) return [];
    
    const uploadPromises = uploadedImages.map(async (file, index) => {
      const storageRef = ref(storage, `orders/${user?.uid || 'guest'}/${Date.now()}_${index}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    });

    return Promise.all(uploadPromises);
  };

  const processCODOrder = async () => {
    setIsProcessing(true);
    setUploadProgress(0);
    try {
      const imageUrls = await uploadImagesToFirebase();
      setUploadProgress(50);

      const { trackingId } = await placeCODOrder({ user, order, files: uploadedImages });
      setUploadProgress(100);

      navigate('/payment-success', {
        state: { orderId: order.id, trackingId, paymentId: 'COD' }
      });
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processOnlinePayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is still loading. Please wait a moment and try again.');
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    if (!razorpayKey) {
      alert('Payment gateway configuration error. Please try Cash on Delivery or contact support.');
      console.error('Razorpay Key ID missing. Please add VITE_RAZORPAY_KEY_ID to your .env file');
      return;
    }

    try {
      setIsProcessing(true);

      // First create order in your backend or directly proceed with payment
      const amountPaise = Math.round(Number(order.pricing.total || 0) * 100);

      const paymentResponse = await openRazorpay({
        key: razorpayKey,
        amount: amountPaise,
        name: 'GlocalShip',
        description: `Order #${order.id}`,
        prefill: {
          name: order.shipping.fullName,
          email: order.shipping.email,
          contact: order.shipping.phone || ''
        },
        notes: {
          order_id: String(order.id),
          items_count: String(order.items.length)
        },
        methodPref: paymentMethod
      });

      // After successful payment, upload images and create Firestore docs
      const imageUrls = await uploadImagesToFirebase();

      const { trackingId } = await placePaidOrder({
        user,
        order,
        files: uploadedImages,
        gateway: 'razorpay',
        paymentDetails: { ...paymentResponse, method: paymentMethod }
      });

      setUploadProgress(100);
      navigate('/payment-success', {
        state: {
          orderId: order.id,
          trackingId,
          paymentId: paymentResponse?.razorpay_payment_id
        }
      });
    } catch (err) {
      console.error('Payment failed/cancelled:', err);
      if (err?.message !== 'dismissed') {
        alert('Payment was not completed. Please try again.');
      }
      navigate('/payment-failed', {
        state: { orderId: order.id, reason: err?.error?.description || err?.message || 'Payment not completed' }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processOrder = async () => {
    // Create account automatically for guest users using checkout email
    try {
      if (!user) {
        await ensureUserFromCheckout(order?.shipping || {});
      }
    } catch {}

    if (paymentMethod === 'cod') {
      await processCODOrder();
    } else {
      await processOnlinePayment();
    }
  };

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: FaMoneyBillWave,
      color: 'text-green-500'
    },
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay via UPI apps (GPay, PhonePe, BHIM)',
      icon: FaCreditCard,
      color: 'text-blue-500'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Secure payment with your card',
      icon: FaCreditCard,
      color: 'text-blue-500'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Pay via your bank account',
      icon: FaCreditCard,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">1</div>
              <span className="text-gray-400">Cart</span>
            </div>
            <FiChevronRight className="text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">2</div>
              <span className="text-gray-400">Checkout</span>
            </div>
            <FiChevronRight className="text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium">3</div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="lg:flex gap-8">
          {/* Left: Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Payment Method</h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3">
                        <method.icon className={`h-6 w-6 ${method.color}`} />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Rest of your JSX remains the same */}
            {/* Image Upload Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Product Images (Optional)</h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload images of your products for better tracking and identification
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name || item.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name || item.title}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">
                      ₹{((Number(item.price) || 0) * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{order.pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{order.pricing.shipping === 0 ? "Free" : `₹${order.pricing.shipping}`}</span>
                </div>
                {order.pricing.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.pricing.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{order.pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Button */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Order</h2>
              
              {paymentMethod === 'cod' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center gap-2 text-green-800">
                    <FaCheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Cash on Delivery</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Pay ₹{order.pricing.total.toLocaleString()} when you receive your order
                  </p>
                </div>
              )}

              {paymentMethod !== 'cod' && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center gap-2 text-blue-800">
                    <FaCheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Razorpay Secure Checkout</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    {!razorpayLoaded && "Loading payment gateway..."}
                    {razorpayLoaded && `Pay with ${paymentMethod.toUpperCase()} • Cards • NetBanking • Wallets`}
                  </p>
                </div>
              )}

              <button
                onClick={processOrder}
                disabled={isProcessing || (paymentMethod !== 'cod' && !razorpayLoaded)}
                className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    Processing Order...
                  </span>
                ) : paymentMethod !== 'cod' && !razorpayLoaded ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    Loading Payment...
                  </span>
                ) : (
                  `Place Order - ₹${order.pricing.total.toLocaleString()}`
                )}
              </button>

              {isProcessing && uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Uploading images...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500" />
                  <span>Secure checkout</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your order information is protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Open Razorpay Checkout and resolve with payment ids on success
function openRazorpay({ key, amount, name, description, prefill, notes, methodPref }) {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('Razorpay SDK not loaded'));
      return;
    }

    const options = {
      key,
      amount,
      currency: 'INR',
      name,
      description,
      prefill,
      notes,
      theme: { color: '#f59e0b' },
      modal: { 
        ondismiss: () => reject(new Error('Payment cancelled by user'))
      },
      handler: function (response) {
        resolve({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature
        });
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      reject(new Error(response.error.description || 'Payment failed'));
    });
    rzp.open();
  });
}

export default PaymentPage;