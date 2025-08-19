import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../HomePagemain/ProductContext";
import {
  FaChevronDown,
  FaHeart,
  FaLock,
  FaShieldAlt,
  FaHandPaper,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === parseInt(id));

  const [showDetails, setShowDetails] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product?.imgs || product?.image || [];
  const selectedImage = images[selectedIndex] || "";

  if (!product) {
    return <div className="p-6 text-red-600 text-xl">Product not found.</div>;
  }

  return (
    <div className="prdt-details-container bg-gray-50 max-w-6xl mx-auto px-4 py-10 mt-20">
      <div className="prdt-layout flex flex-col md:flex-row items-start gap-10">
        {/* Left: Image Gallery and Features */}
        <div className="w-full md:w-1/2">
          {/* Image Gallery */}
          <div className="prdt-img-gallery flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="prdt-thumbnails flex md:flex-col gap-2 md:max-h-[500px] overflow-y-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-16 h-16 object-cover cursor-pointer border ${
                    selectedIndex === index
                      ? "border-amber-500"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="prdt-main-img flex-1">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full h-auto md:h-[500px] object-cover shadow-md"
              />
            </div>
          </div>

          {/* Features Section Below Image */}
          <div className="prdt-features mt-6 w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[460px]">
              <div className="bg-[#F4F6F8] p-2 text-center">
                <FaLock className="mx-auto mb-3 text-2xl text-gray-700" />
                <h4 className="text-sm font-semibold text-gray-900">
                  Secure Payments
                </h4>
                <p className="text-sm text-gray-600">
                  100% safe & encrypted checkout.
                </p>
              </div>

              <div className="bg-[#F4F6F8] p-2 text-center">
                <FaShieldAlt className="mx-auto mb-3 text-2xl text-gray-700" />
                <h4 className="text-sm font-semibold text-gray-900">
                  Fully Insured
                </h4>
                <p className="text-sm text-gray-600">
                  Orders are fully insured.
                </p>
              </div>

              <div className="bg-[#F4F6F8] p-2 text-center ">
                <FaHandPaper className="mx-auto mb-3 text-2xl text-gray-700" />
                <h4 className="text-sm font-semibold text-gray-900">
                  100% Handmade
                </h4>
                <p className="text-sm text-gray-600">MADE IN INDIA.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="prdt-details-sec w-full max-w-[460px] md:w-1/2 mt-8 md:mt-0 flex flex-col space-y-5">
          <h1 className="prdt-title text-4xl font-semibold text-gray-900">
            {product.title}
          </h1>

          <p className="prdt-desc text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          <hr className="my-2 border-gray-300" />

          <div className="prdt-price text-3xl font-medium text-amber-500">
            {product.price}
          </div>

          {/* Quantity Selector */}
          <div className="prdt-quantity-wrapper flex flex-col gap-4">
            <div className="quantity-head ">Quantity:</div>
            <div className="prdt-quantity-ctrl flex w-fit items-center border border-amber-400/50 rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-2xl border-r border-amber-400/50"
              >
                −
              </button>
              <span className="px-4 py-1 bg-white text-gray-800 text-2xl">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 text-2xl border-l border-amber-400/50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart, Wishlist, Buy Now */}
          <div className="prdt-action-btn space-y-4">
            {/* Add to Cart and Wishlist Side by Side */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg transition-all duration-100 ease-in-out hover:from-amber-500 hover:to-amber-600">
                Add to Cart
              </button>

              <button className="p-3 rounded-full bg-white border border-amber-400/50 transition">
                <FaHeart className="text-amber-500 text-xl" />
              </button>
            </div>

            {/* Buy Now button below */}
            <button className="w-full px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg transition-all duration-100 ease-in-out hover:from-amber-500 hover:to-amber-600">
              Buy Now
            </button>
          </div>

          {/* Description Accordion */}
          <div className="prdt-drpdown border border-amber-400/50 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden transition-all duration-500 ease-in-out">
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="prdt-drpdown-btn w-full text-left px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-800 transition"
            >
              Description
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  showDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-500 ease-in-out px-4 ${
                showDetails
                  ? "max-h-96 py-4 opacity-100"
                  : "max-h-0 py-0 opacity-0"
              } overflow-hidden text-sm text-gray-800 space-y-2`}
            >
              <p>
                <strong>Material:</strong> Terracotta (Natural Clay)
              </p>
              <p>
                <strong>Usage:</strong> Water Storage, Home Décor, Planters
              </p>
              <p>
                <strong>Artisan:</strong> Handcrafted by rural Indian potters
              </p>
              <p>
                <strong>Eco-friendly:</strong> Yes
              </p>
              <p>
                <strong>Set Includes:</strong> Assorted clay pots (6–8 pieces)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
