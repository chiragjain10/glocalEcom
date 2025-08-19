import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext"; // Adjust path as necessary

import {
  FaChevronDown,
  FaHeart,
  FaLock,
  FaShoppingCart,
  FaBolt,
  FaStar,
  FaRegStar,
  FaChevronUp,
} from "react-icons/fa";
import { FiTruck } from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, addToCart } = useContext(ProductContext);
  const product = products.find((p) => p.id === parseInt(id));

  const [showDetails, setShowDetails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Normalize images array from different possible keys
  const images =
    product?.imgs && Array.isArray(product.imgs)
      ? product.imgs
      : product?.image
      ? Array.isArray(product.image)
        ? product.image
        : [product.image]
      : [];

  const selectedImage = images[selectedIndex] || "";

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 text-red-600 text-lg bg-white rounded-lg shadow-md border border-red-100">
          Product not found.
        </div>
      </div>
    );
  }

  // Safe numeric price for calculations even if price is like "₹899"
  const priceNum =
    typeof product.price === "number"
      ? product.price
      : Number(String(product.price).replace(/[^\d.]/g, "")) || 0;

  // Updated addToCart: supports silent alert and optional redirect
  const handleAddToCart = (e, { silent = false, redirectToCart = true } = {}) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: selectedImage || images[0] || "",
      quantity,
    };

    try {
      if (typeof addToCart === "function") {
        addToCart(cartItem, quantity);
      } else {
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingIndex = cartItems.findIndex((item) => item.id === cartItem.id);

        if (existingIndex >= 0) {
          cartItems[existingIndex].quantity += quantity;
        } else {
          cartItems.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      if (!silent) {
        alert(`${product.title} added to cart!`);
      }
      if (redirectToCart) {
        navigate("/cart");
      }
      console.log("Add to cart successful:", cartItem);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleBuyNow = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    // Add to cart silently (no alert), and don't redirect to /cart
    handleAddToCart(null, { silent: true, redirectToCart: false });
    navigate("/checkout");
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2">
            {/* Thumbnails + Main Image */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails Column */}
              <div className="flex sm:flex-col gap-2 sm:max-h-[400px] overflow-y-auto pr-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 focus:outline-none transition-all ${
                      selectedIndex === index
                        ? "ring-2 ring-amber-500"
                        : "hover:ring-1 hover:ring-gray-300"
                    } rounded-md overflow-hidden border border-gray-200 bg-white p-1`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center text-sm text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FaLock className="text-amber-600" />
                </div>
                <h4 className="text-xs font-medium text-gray-800">Secure Payments</h4>
                <p className="text-xs text-gray-500 mt-1">100% protected</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FiTruck className="text-amber-600" />
                </div>
                <h4 className="text-xs font-medium text-gray-800">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-1">Over ₹999</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FaHeart className="text-amber-600" />
                </div>
                <h4 className="text-xs font-medium text-gray-800">Handmade</h4>
                <p className="text-xs text-gray-500 mt-1">Made in India</p>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              {/* Product Header */}
              <div className="mb-4">
                <span className="inline-block text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full mb-2">
                  Best Seller
                </span>
                <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                <div className="flex items-center mt-1">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-sm">
                        {star <= 4 ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(42 reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-amber-600">{product.price}</span>
                <span className="text-sm text-gray-500 ml-2 line-through">₹{Math.round(priceNum * 1.2)}</span>
                <span className="text-xs font-medium text-white bg-green-500 ml-2 px-1.5 py-0.5 rounded">
                  20% OFF
                </span>
              </div>

              {/* Description */}
              <div className="mb-5">
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                <div className="flex w-fit items-center border border-amber-400 rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 bg-white text-gray-800 text-sm font-medium border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, { silent: false, redirectToCart: true })}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-md font-medium flex items-center justify-center gap-2 hover:from-amber-600 hover:to-amber-700 transition-all text-sm"
                >
                  <FaShoppingCart className="text-sm" />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full px-4 py-2.5 bg-gray-800 text-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-all text-sm"
                >
                  <FaBolt className="text-sm" />
                  Buy Now
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full px-4 py-2 rounded-md border flex items-center justify-center gap-2 text-sm ${
                    isWishlisted
                      ? "border-amber-300 text-amber-600 bg-amber-50"
                      : "border-gray-300 text-gray-600 hover:border-amber-300 hover:text-amber-600"
                  }`}
                >
                  <FaHeart className={isWishlisted ? "fill-current" : ""} />
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>

              {/* Delivery Info */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Delivery:</span> Get it by <strong>Friday, August 12</strong> with standard shipping
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details Accordion */}
            <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
              >
                <span>Product Details</span>
                {showDetails ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {showDetails && (
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600">
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="text-gray-500 w-28 flex-shrink-0">Material:</span>
                      <span>Terracotta (Natural Clay)</span>
                    </li>
                    <li className="flex">
                      <span className="text-gray-500 w-28 flex-shrink-0">Usage:</span>
                      <span>Water Storage, Home Décor, Planters</span>
                    </li>
                    <li className="flex">
                      <span className="text-gray-500 w-28 flex-shrink-0">Artisan:</span>
                      <span>Handcrafted by rural Indian potters</span>
                    </li>
                    <li className="flex">
                      <span className="text-gray-500 w-28 flex-shrink-0">Dimensions:</span>
                      <span>6-8 inches height</span>
                    </li>
                    <li className="flex">
                      <span className="text-gray-500 w-28 flex-shrink-0">Care:</span>
                      <span>Hand wash, avoid extreme temperatures</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
