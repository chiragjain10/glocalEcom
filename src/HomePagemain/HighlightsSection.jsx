import React, { useState } from 'react';
import { FaFire, FaStar, FaShoppingCart, FaHeart, FaPlus, FaMinus, FaEye } from 'react-icons/fa';

const trendingProducts = [
  { id: 1, name: "Handmade Pot", price: "₹899", image: "https://cdn.pixabay.com/photo/2016/11/22/19/15/indian-1850925_1280.jpg" },
  { id: 2, name: "Tribal Mask", price: "₹1299", image: "https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg" },
];

const newArrivals = [
  { id: 3, name: "Terracotta Lamp", price: "₹699", image: "https://cdn.pixabay.com/photo/2020/11/30/08/27/lamp-5791996_1280.jpg" },
  { id: 4, name: "Warli Painting", price: "₹999", image: "https://cdn.pixabay.com/photo/2021/02/25/10/22/warli-6048381_1280.jpg" },
];

const ProductCard = ({ item, badge }) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border border-gray-100 hover:border-amber-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge and Wishlist */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div className={`px-3 py-1 text-xs font-medium rounded-full shadow-md ${
          badge === "Trending" 
            ? "bg-gradient-to-r from-red-500 to-amber-500 text-white" 
            : "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
        }`}>
          {badge}
        </div>
        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-amber-50 transition-colors">
          <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick View Button */}
        <button className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 text-amber-600 font-medium px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <FaEye /> Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">Handcrafted by Indian artisans</p>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-extrabold text-amber-500">{item.price}</p>
          <div className="flex items-center text-amber-400">
            <FaStar className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-600">4.8</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className={`flex items-center justify-between mt-3 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 h-0 mt-0 overflow-hidden"
        }`}>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={decreaseQuantity}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <FaMinus className="w-3 h-3" />
            </button>
            <span className="px-4 py-2 bg-white font-medium">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg">
            <FaShoppingCart /> 
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const HighlightsSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* 🔥 Trending Products */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-red-500 to-amber-500 rounded-xl shadow-lg">
              <FaFire className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
              <p className="text-gray-500">Most loved by our customers</p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingProducts.map((item) => (
              <ProductCard key={item.id} item={item} badge="Trending" />
            ))}
          </div>
        </div>

        {/* 🆕 New Arrivals */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-lg">
              <FaStar className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
              <p className="text-gray-500">Fresh additions to our collection</p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newArrivals.map((item) => (
              <ProductCard key={item.id} item={item} badge="New" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HighlightsSection;