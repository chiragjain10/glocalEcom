import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import { FiChevronRight, FiCheck } from "react-icons/fi";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

const countries = [
  { name: "India", code: "+91", emoji: "🇮🇳" },
  { name: "United States", code: "+1", emoji: "🇺🇸" },
  { name: "United Kingdom", code: "+44", emoji: "🇬🇧" },
  { name: "Canada", code: "+1", emoji: "🇨🇦" },
  { name: "Germany", code: "+49", emoji: "🇩🇪" },
  { name: "Australia", code: "+61", emoji: "🇦🇺" },
  { name: "France", code: "+33", emoji: "🇫🇷" },
  { name: "Japan", code: "+81", emoji: "🇯🇵" },
];

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Shipping methods with costs
  const shippingMethods = [
    { id: "standard", name: "Standard Delivery", cost: 0, time: "3-5 business days" },
    { id: "express", name: "Express Delivery", cost: 150, time: "1-2 business days" },
    { id: "overnight", name: "Overnight Delivery", cost: 300, time: "Next business day" },
  ];

  // Coupon codes
  const availableCoupons = [
    { code: "WELCOME10", discount: 10, minAmount: 500 },
    { code: "SAVE20", discount: 20, minAmount: 1000 },
    { code: "FREESHIP", discount: 0, shippingDiscount: true, minAmount: 800 },
  ];

  useEffect(() => {
    // Pre-fill form with user data if logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
        fullName: user.displayName || "",
      }));
    }
  }, [user]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const selectedShipping = shippingMethods.find(method => method.id === shippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.cost : 0;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.shippingDiscount) {
      discount = shippingCost;
    } else {
      discount = (subtotal * appliedCoupon.discount) / 100;
    }
  }
  
  const total = subtotal + shippingCost - discount;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon && subtotal >= coupon.minAmount) {
      setAppliedCoupon(coupon);
      setErrors(prev => ({ ...prev, coupon: "" }));
    } else if (coupon && subtotal < coupon.minAmount) {
      setErrors(prev => ({ ...prev, coupon: `Minimum order amount ₹${coupon.minAmount} required` }));
    } else {
      setErrors(prev => ({ ...prev, coupon: "Invalid coupon code" }));
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: Date.now().toString(),
        userId: user?.uid || "guest",
        items: cart,
        shipping: {
          ...formData,
          method: selectedShipping,
        },
        pricing: {
          subtotal,
          shipping: shippingCost,
          discount,
          total,
        },
        status: "pending",
        createdAt: new Date().toISOString(),
        coupon: appliedCoupon,
      };
      
      // Store order in localStorage or send to backend
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to payment page with order details
      navigate("/payment", { 
        state: { 
          order,
          fromCheckout: true 
        } 
      });
      
    } catch (error) {
      console.error("Order submission failed:", error);
      setErrors(prev => ({ ...prev, submit: "Failed to submit order. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveItem = (id) => {
    // This will be handled by the cart context
    // We'll just navigate back to cart if empty
    if (cart.length === 1) {
      navigate("/cart");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to proceed with checkout</p>
          <button
            onClick={() => navigate("/")}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">1</div>
              <span className="text-gray-400">Cart</span>
            </div>
            <FiChevronRight className="text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium">2</div>
              <span className="font-medium">Checkout</span>
            </div>
            <FiChevronRight className="text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">3</div>
              <span className="text-gray-400">Payment</span>
            </div>
          </div>
        </div>

        <div className="lg:flex gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUser className="text-amber-500" />
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <select
                        value={selectedCountry.code}
                        onChange={(e) => setSelectedCountry(countries.find(c => c.code === e.target.value))}
                        className="w-24 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.emoji} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`flex-1 px-3 py-2 border rounded-r-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" />
                  Shipping Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your street address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter city"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter state"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter ZIP code"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      rows="3"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{method.name}</span>
                          <span className="text-lg font-semibold">
                            {method.cost === 0 ? "Free" : `₹${method.cost}`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{method.time}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </span>
                ) : (
                  `Proceed to Payment - ₹${total.toLocaleString()}`
                )}
              </button>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center">{errors.submit}</p>
              )}
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name || item.title}
                      className="w-12 h-12 rounded object-cover"
                      onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {item.name || item.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm text-gray-900">
                        ₹{((Number(item.price) || 0) * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div className="border-t pt-4 mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition"
                  >
                    Apply
                  </button>
                </div>
                {errors.coupon && <p className="text-red-500 text-sm mt-1">{errors.coupon}</p>}
                {appliedCoupon && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-800">
                        {appliedCoupon.shippingDiscount ? "Free shipping applied!" : `${appliedCoupon.discount}% off applied!`}
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <FiCheck className="text-green-500" />
                  <span>Secure checkout</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
