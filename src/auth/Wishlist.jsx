import React from 'react';
import { Link } from 'react-router-dom';


const wishlistData = [
  {
    id: 1,
    image: './img/1.jpg',
    name: 'Warli Painting',
    details: '12" × 12" · Terracofta red · Tribal Art',
    price: '₹1,600',
    stock: 'In Stock',
  },
  {
    id: 2,
    image: './img/2.jpg',
    name: 'Narasimha and Lakshmi Statue',
    details: '12" · Bronze Gold · Hindu Delfy Statue',
    price: '₹680',
    stock: 'In Stock',
  },
];
const Wishlist = () => {
  return (
    <div className="bg-container bg-gray-50 p-6 min-h-screen">
      <div className="wishlist-container p-6  max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="wishlist-header flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Wishlist</h1>
          <div className="wishlist-controls">
            <a href="#" className="text-amber-600 hover:text-amber-800 font-medium transition-colors">Sort</a>
            <span className="mx-2 text-gray-400">·</span>
            <a href="#" className="text-amber-600 hover:text-amber-800 font-medium transition-colors">Filter</a>
          </div>
        </div>
        
        {/* Subtext */}
        <p className="wishlist-subtext text-gray-600 mb-6">
          Your saved items are here. Easily move them to your cart.
        </p>

        {/* Wishlist Table */}
        <div className="wishlist-table">
          {/* Table Header */}
          <div className="wishlist-table-header bg-gray-50 p-3 rounded-t-lg font-semibold text-gray-700 grid grid-cols-4 border-b border-gray-200">
            <span>Product</span>
            <span>Price</span>
            <span>Stock status</span>
            <span>Action</span>
          </div>

          {/* Wishlist Items */}
          {wishlistData.map((item) => (
            <div className="wishlist-item hover:bg-gray-50 transition-colors duration-200 p-3 border-b border-gray-100 grid grid-cols-4 items-center" key={item.id}>
              <div className="wishlist-product flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                <div>
                  <strong className="text-lg font-semibold text-gray-800">{item.name}</strong>
                  <div className="details text-gray-500 text-sm">{item.details}</div>
                </div>
              </div>
              <div className="wishlist-price font-medium text-gray-700">{item.price}</div>
              <div className={`wishlist-stock ${item.stock === 'In Stock' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {item.stock}
              </div>


              <Link to={'/cart'}>
                   <button className="wishlist-btn bg-amber-400 hover:bg-amber-500 text-black font-medium py-2 px-4 rounded-md transition-all  font-semibold font-bold duration-200 shadow-sm hover:shadow-md w-fit transform hover:-translate-y-0.5">
                ADD TO CART
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
