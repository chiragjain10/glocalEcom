// src/pages/CartPage.jsx
import React from "react";
import { FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../Context/ProducatContext"; // fix path if you renamed file

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart = [],
    removeFromCart = () => {},
    updateQuantity = () => {},
    clearCart = () => {},
  } = useContext(ProductContext);

  // If your context stores items under `cart`, this will work.
  // If your context uses a different name, adjust the destructuring above.

  // Derived totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(String(item.price).replace(/[^0-9.-]+/g, "")) || 0) * (item.quantity || 1),
    0
  );

  const discount = 350; // keep as is or compute
  const shipping = 0;
  const total = subtotal - discount + shipping;

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-container min-h-screen mt-18 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <button
            className="px-4 py-2 bg-amber-500 text-white rounded"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-container py-8 px-4 min-h-screen mt-19">
      <div className="max-w-6xl mx-auto">
        <div className="cart-header mb-6">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

          <div className="flex justify-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-medium">1</div>
              <div>Cart</div>
            </div>
            <FiChevronRight className="mt-2" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">2</div>
              <div>Checkout</div>
            </div>
            <FiChevronRight className="mt-2"  />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">3</div>
              <div>Payment</div>
            </div>
          </div>
        </div>

        <div className="cart-content grid lg:grid-cols-3 gap-6">
          {/* Items list */}
          <div className="cart-items lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                className="cart-item rounded-lg shadow p-4 border border-amber-400/20 flex gap-4"
                key={item.id}
              >
                <div className="w-28 h-28 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                  {/* If image is remote/url, use it; if using local images, ensure they are imported or in /public */}
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
                      {item.size && <div className="text-sm text-gray-500">Size: {item.size}</div>}
                      {item.color && <div className="text-sm text-gray-500">Color: {item.color}</div>}
                    </div>

                    <div className="flex items-start gap-2">
                      <button
                        title="Edit"
                        className="action-btn edit p-2 rounded hover:bg-gray-100"
                        // add edit behavior if required
                        onClick={() => alert("Edit feature not implemented")}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        title="Remove"
                        className="action-btn delete p-2 rounded hover:bg-red-50 text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">
                        ₹{(Number(String(item.price).replace(/[^0-9.-]+/g, "")) || 0).toLocaleString()}
                      </div>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="text-sm text-gray-400 line-through">
                          ₹{Number(String(item.originalPrice).replace(/[^0-9.-]+/g, "")).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="quantity-controls flex items-center gap-2">
                      <button
                        className="quantity-btn px-3 py-1 border rounded"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      >
                        −
                      </button>
                      <span className="px-3 py-1 border-t border-b">{item.quantity || 1}</span>
                      <button
                        className="quantity-btn px-3 py-1 border rounded"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="order-summary rounded-lg shadow p-6 border border-amber-400/20 bg-white">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((s, i) => s + (i.quantity || 0), 0)} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>

              <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="w-full mt-5 mb-3 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-md hover:opacity-95"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="w-full mb-2 py-2 bg-gray-100 text-gray-800 rounded-md"
              onClick={() => {
                if (confirm("Clear cart?")) clearCart();
              }}
            >
              Clear Cart
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Estimated delivery by <strong>April 25, 2023</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
