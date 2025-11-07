import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaUpload, FaSpinner } from 'react-icons/fa';
import { FiChevronRight, FiCheck } from 'react-icons/fi';
import { useAuth } from '../Context/AuthContext';
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

  // Get order data from checkout
  const order = location.state?.order;
  const fromCheckout = location.state?.fromCheckout;

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

  const processOrder = async () => {
    setIsProcessing(true);
    setUploadProgress(0);

    try {
      // Upload images first
      const imageUrls = await uploadImagesToFirebase();
      setUploadProgress(50);

      // Create order document in Firestore
      const orderData = {
        userId: user?.uid || 'guest',
        userEmail: user?.email || order.shipping.email,
        orderId: order.id,
        items: order.items,
        shipping: order.shipping,
        pricing: order.pricing,
        paymentMethod: paymentMethod,
        status: paymentMethod === 'cod' ? 'pending' : 'processing',
        imageUrls: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // Add tracking info
        trackingStatus: 'order_placed',
        trackingHistory: [
          {
            status: 'order_placed',
            timestamp: new Date(),
            description: 'Order has been placed successfully'
          }
        ]
      };

      // Add to orders collection
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Add to parcels collection for tracking
      const parcelData = {
        userId: user?.uid || 'guest',
        parcelId: order.id,
        fullName: order.shipping.fullName,
        phone: order.shipping.phone,
        email: order.shipping.email,
        pickupAddress: order.shipping.address,
        dropAddress: `${order.shipping.city}, ${order.shipping.state} ${order.shipping.zipCode}`,
        weight: order.items.reduce((sum, item) => sum + (item.weight || 1), 0),
        description: `Order #${order.id} - ${order.items.length} items`,
        status: 'received',
        imageUrl: imageUrls[0] || null,
        createdAt: serverTimestamp(),
        orderRef: docRef.id
      };

      await addDoc(collection(db, 'parcels'), parcelData);

      setUploadProgress(100);

      // Show success and redirect
      setTimeout(() => {
        navigate('/', { 
          state: { 
            orderSuccess: true, 
            orderId: order.id 
          } 
        });
      }, 2000);

    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
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
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Secure payment with your card',
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

              {/* Display uploaded images */}
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

              <button
                onClick={processOrder}
                disabled={isProcessing}
                className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    Processing Order...
                  </span>
                ) : (
                  `Place Order - ₹${order.pricing.total.toLocaleString()}`
                )}
              </button>

              {/* Upload Progress */}
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

export default PaymentPage;
