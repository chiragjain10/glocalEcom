import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    navigate("/cart");
  };

  return (
    <div className="bg-container bg-gray-50 p-6 min-h-screen">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
            <p className="text-gray-600">Saved items for later. Move them to your cart anytime.</p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Clear all items from wishlist?")) clearWishlist();
              }}
              className="self-start sm:self-auto px-4 py-2 text-sm rounded-md border border-red-300 text-red-700 hover:bg-red-50"
            >
              Clear wishlist
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <FiShoppingCart />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Your wishlist is empty</h2>
            <p className="text-gray-500 mt-1">Browse products and tap the heart to save them here.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-5 px-5 py-2.5 rounded-md bg-amber-500 text-white font-medium hover:opacity-95"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-amber-400/20 overflow-hidden group">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title || item.name}
                    className="w-full h-52 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-red-50 text-red-600 shadow"
                    title="Remove"
                  >
                    <FiTrash2 />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title || item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description || item.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-lg font-semibold text-gray-900">
                      {(() => {
                        const n = Number(String(item.price).replace(/[^0-9.-]+/g, "")) || 0;
                        return `₹${n.toLocaleString()}`;
                      })()}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-white text-sm font-medium hover:opacity-95"
                    >
                      Move to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
