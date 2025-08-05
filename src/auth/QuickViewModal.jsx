import React from "react";
import { FaTimes, FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import cetegories from "../HomePagemain/MenuNavigation";

const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  // Sample rating - you can replace with actual product rating
  const rating = 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4 py-8"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all"
            onClick={onClose}
          >
            <FaTimes />
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-full object-contain bg-gray-100 p-8"
              />
              {/* Badge */}
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Info */}
            <div className="md:w-1/2 p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    {[...Array(fullStars)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {hasHalfStar && <FaStar half />}
                    {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">(42 reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-amber-600 font-bold text-2xl">₹{product.price}</p>
                {product.originalPrice && (
                  <p className="text-gray-400 text-sm line-through">₹{product.originalPrice}</p>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

              {product.colors && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Colors:</h4>
                  <div className="flex gap-2">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sizes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, i) => (
                      <button
                        key={i}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-amber-50 hover:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <button className="flex-1 bg-amber-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="p-3 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaHeart />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    In Stock
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Free Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;