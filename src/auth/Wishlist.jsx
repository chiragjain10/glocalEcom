import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../HomePagemain/WishlistContext";
import { FiX } from "react-icons/fi"; // ❌ Cross icon

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="bg-container bg-gray-50 p-6 min-h-screen">
      <div className="wishlist-container p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="wishlist-header flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Wishlist</h1>
          <div className="wishlist-controls">
            <a href="#" className="text-amber-600 hover:text-amber-800 font-medium">
              Sort
            </a>
            <span className="mx-2 text-gray-400">·</span>
            <a href="#" className="text-amber-600 hover:text-amber-800 font-medium">
              Filter
            </a>
          </div>
        </div>

        {/* Subtext */}
        <p className="wishlist-subtext text-gray-600 mb-6">
          Your saved items are here. Easily move them to your cart.
        </p>

        {/* Table */}
        <div className="wishlist-table">
          <div className="wishlist-table-header bg-gray-50 p-3 rounded-t-lg font-semibold text-gray-700 grid grid-cols-4 border-b border-gray-200">
            <span>Product</span>
            <span>Price</span>
            <span>Stock status</span>
            <span>Action</span>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-gray-500 p-6 col-span-4 text-center">
              Your wishlist is empty.
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                className="wishlist-item hover:bg-gray-50 p-3 border-b border-gray-100 grid grid-cols-4 items-center"
                key={item.id}
              >
                {/* Product */}
                <div className="wishlist-product flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <strong className="text-lg font-semibold text-gray-800">
                      {item.name || item.title}
                    </strong>
                    <div className="text-gray-500 text-sm">
                      {item.details || item.category}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="wishlist-price font-medium text-gray-700">
                  {item.price}
                </div>

                {/* Stock */}
                <div
                  className={`${
                    item.stock === "In Stock" ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {item.stock || "In Stock"}
                </div>

                {/* Action */}
                <div className="flex items-center space-x-3">
                  <Link to={"/cart"}>
                    <button className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md">
                      ADD TO CART
                    </button>
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
