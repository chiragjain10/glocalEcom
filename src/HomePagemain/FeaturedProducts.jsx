import React from 'react';
import { FaHeart, FaShoppingCart, FaArrowRight } from 'react-icons/fa';

const products = [
  {
    id: 1,
    title: 'Handmade Musician',
    type: 'Tribal Art',
    price: 1499,
    image: 'https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg',
  },
  {
    id: 2,
    title: 'Copper Craft Bowl',
    type: 'Copper Craft',
    price: 999,
    image: 'https://cdn.pixabay.com/photo/2024/12/23/07/48/heavenly-bamboo-9286035_1280.jpg',
  },
  {
    id: 3,
    title: 'Wooden Peacock Carving',
    type: 'Wood Carving',
    price: 1799,
    image: 'https://cdn.pixabay.com/photo/2013/01/05/21/02/art-74050_1280.jpg',
  },
  {
    id: 4,
    title: 'Red Lacquer Toys',
    type: 'Channapatna Wood',
    price: 799,
    image: 'https://cdn.pixabay.com/photo/2017/07/26/22/35/wooden-mask-2543403_1280.jpg',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-[#f4f2e9] py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Best Sellers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="text-center">
            {/* Card */}
            <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">

              {/* Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 z-0"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">

                {/* Add to Cart */}
                <button className="text-black bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition duration-200 px-4 py-2 text-sm rounded-full flex items-center gap-2 shadow-md hover:shadow-lg font-semibold">
                  <FaShoppingCart />
                  Add to Cart
                </button>

                {/* Wishlist */}
                <button className="text-white bg-pink-500 hover:bg-pink-600 active:scale-95 transition duration-200 px-4 py-2 text-sm rounded-full flex items-center gap-2 shadow-md hover:shadow-lg font-semibold">
                  <FaHeart />
                  Wishlist
                </button>
              </div>
            </div>

            {/* Product Info */}
            <p className="text-sm text-gray-500 mt-4">{product.type}</p>
            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
            <p className="text-green-700 text-base font-bold">₹{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* View All Button */}
        <div className="flex justify-center mt-10">
      <button className="relative overflow-hidden px-6 py-3 rounded-md flex items-center gap-2 font-semibold text-black 
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
    </section>
  );
};

export default FeaturedProducts;
