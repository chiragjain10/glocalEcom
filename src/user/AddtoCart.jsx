import React, { useState, useEffect } from "react";
import {
  FiTrash2,
  FiShoppingBag,
  FiChevronRight,
  FiStar,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toNumberPrice = (p) => {
    if (typeof p === "number") return p;
    const n = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + toNumberPrice(item.price) * (item.quantity || 1),
    0
  );
  const discount = 0;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const handleBuyNow = () => {
    if (cart.length > 0) {
      navigate("/checkout", { state: { cartItems: cart } });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Loading your premium collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-10 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-2 shadow-md">
            <FiShoppingBag className="text-white text-xl sm:text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900">
            Your Curated Collection
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>

          {cart.length === 0 ? (
            <div className="pt-6 space-y-3">
              <p className="text-slate-600 text-sm sm:text-base">
                Your collection is awaiting treasures.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 sm:px-8 sm:py-3 bg-slate-900 text-white text-sm sm:text-base rounded-full hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Discover Premium Products
              </button>
            </div>
          ) : (
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Review your selected items and proceed to checkout.
            </p>
          )}
        </div>

        {/* Step Indicator */}
        {cart.length > 0 && (
          <div className="flex justify-center flex-wrap items-center gap-4 sm:gap-6">
            {["Cart", "Checkout", "Confirmation"].map((label, i) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-500 ${
                      i === 0
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-110"
                        : "bg-white text-slate-400 border border-slate-200 shadow-sm"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      i === 0 ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && <FiChevronRight className="text-slate-300 text-lg" />}
              </div>
            ))}
          </div>
        )}

        {/* Main Section */}
        <div className="flex flex-col xl:flex-row gap-8 mt-6">
          {/* Cart Items */}
          <div className="flex-1">
            {cart.length > 0 && (
              <div className="space-y-5">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-400 p-5 sm:p-6"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      {/* Image */}
                      <div className="sm:col-span-4 flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-20 h-20 bg-amber-50 rounded-xl flex items-center justify-center p-2">
                            <img
                              src={
                                item.image ||
                                (item.images?.[0]) ||
                                (item.imgs?.[0]) ||
                                item.thumbnail ||
                                "/placeholder.png"
                              }
                              alt={item.name || item.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          {item.quantity > 1 && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {item.quantity}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-1 group-hover:text-amber-600 transition">
                            {item.name || item.title}
                          </h3>
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} size={12} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="sm:col-span-2 text-center text-slate-800 font-medium">
                        ₹{toNumberPrice(item.price).toLocaleString()}
                      </div>

                      {/* Quantity */}
                      <div className="sm:col-span-3 flex justify-center">
                        <div className="flex items-center space-x-2 bg-slate-50 rounded-xl p-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-white border hover:bg-amber-500 hover:text-white transition"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-white border hover:bg-amber-500 hover:text-white transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="sm:col-span-2 text-center font-semibold text-amber-600">
                        ₹
                        {(
                          toNumberPrice(item.price) * (item.quantity || 1)
                        ).toLocaleString()}
                      </div>

                      {/* Delete */}
                      <div className="sm:col-span-1 flex justify-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="xl:w-80 w-full">
              <div className="sticky top-8 space-y-5">
                <div className="bg-slate-900 rounded-2xl shadow-lg text-white p-6">
                  <h2 className="text-xl font-light mb-4">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-700/60 pb-2">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/60 pb-2">
                      <span>Discount</span>
                      <span className="text-green-400">
                        - ₹{discount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/60 pb-2">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-400">Free</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 text-lg font-medium">
                      <span>Total</span>
                      <span className="text-amber-400">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full mt-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-sm sm:text-base font-medium hover:from-amber-600 hover:to-amber-700 transition"
                  >
                    Secure Checkout
                  </button>
                </div>

                {/* Features */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm space-y-4 shadow">
                  {[
                    {
                      icon: <FiShield />,
                      title: "Secure Payment",
                      desc: "256-bit SSL encryption",
                      color: "text-green-600 bg-green-50",
                    },
                    {
                      icon: <FiTruck />,
                      title: "Free Shipping",
                      desc: "On orders over ₹5,000",
                      color: "text-blue-600 bg-blue-50",
                    },
                    {
                      icon: <FiRefreshCw />,
                      title: "Easy Returns",
                      desc: "30-day return policy",
                      color: "text-amber-600 bg-amber-50",
                    },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${f.color} rounded-xl flex items-center justify-center`}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {f.title}
                        </h4>
                        <p className="text-slate-600 text-xs">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
