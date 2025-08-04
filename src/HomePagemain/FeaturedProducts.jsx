import React from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaEye, FaArrowRight } from 'react-icons/fa';

const trendingProducts = [
  {
    id: 1,
    name: "Handmade Pot",
    price: "₹899",
    image: "https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg",
  },
  {
    id: 2,
    name: "Tribal Mask",
    price: "₹1299",
    image: "https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg",
  },
  {
    id: 3,
    name: "Warli Painting",
    price: "₹999",
    image: "https://cdn.pixabay.com/photo/2013/01/05/21/02/art-74050_1280.jpg",
  },
  {
    id: 4,
    name: "Red Lacquer Toys",
    price: "₹749",
    image: "https://cdn.pixabay.com/photo/2017/07/26/22/35/wooden-mask-2543403_1280.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <div className="p-4 bg-gray-50 ">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 text-center p-4">Best Seller</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam, vero, adipisci velit assumenda dolores enim maiores.
      </p>

      {/* Product Cards - Matching HighlightsSection Design */}
      <div className="flex flex-wrap justify-center gap-6">
        {trendingProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border border-gray-100 hover:border-amber-200 w-72"
          >
            {/* Hover Icons */}
            <div className="absolute top-3 right-3 z-10 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white rounded-full shadow hover:bg-amber-100">
                <FaHeart className="text-rose-500 w-4 h-4" />
              </button>
              <button className="p-2 bg-white rounded-full shadow hover:bg-amber-100">
                <FaShoppingCart className="text-amber-600 w-4 h-4" />
              </button>
              <button className="p-2 bg-white rounded-full shadow hover:bg-amber-100">
                <FaEye className="text-gray-700 w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden aspect-square">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
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
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10" style={{marginTop: '50px'}}>
        <button className="relative  text-white overflow-hidden px-6 py-3 rounded-md flex items-center gap-2 font-semibold text-black 
          bg-gradient-to-r from-amber-400 to-amber-500 
          transition-all duration-500 ease-in-out 
          hover:from-yellow-400 hover:to-orange-500 
          hover:shadow-xl group">

          <span className="relative z-10">View All</span>

          <FaArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />

          {/* Optional Glow Layer */}
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg rounded-md"></span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
