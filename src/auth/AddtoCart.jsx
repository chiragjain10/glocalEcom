import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Warli Painting",
      size: "18 inches",
      color: "White artwork on terracotta red background",
      price: 1600,
      originalPrice: 2000,
      quantity: 1,
      image: "./img/1.jpg",
    },
    {
      id: 2,
      name: "Narasimha and Lakshmi Statue",
      size: "12 inches in height",
      color: "Bronze with gold patina finish",
      price: 680,
      originalPrice: 750,
      quantity: 2,
      image: "./img/img4.jpg",
    },
  ]);

  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 350;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="bg-container">
      <div className="cart-page-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <div className="stepper">
            <div className="step active">
              <span>1</span>
              <p>Cart</p>
            </div>
            <FiChevronRight className="step-arrow" />
            <div className="step">
              <span>2</span>
              <p>Checkout</p>
            </div>
            <FiChevronRight className="step-arrow" />
            <div className="step">
              <span>3</span>
              <p>Payment</p>
            </div>
          </div>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div
                className="cart-item rounded-lg shadow p-6 border border-amber-400/50"
                key={item.id}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <div className="item-actions">
                      <button className="action-btn edit">
                        <FiEdit2 />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => removeItem(item.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="item-specs">
                    <span>Size: {item.size}</span>
                    <span>Color: {item.color}</span>
                  </div>
                  <div className="item-pricing">
                    <div className="price-current">
                      ₹{item.price.toLocaleString()}
                    </div>
                    {item.originalPrice > item.price && (
                      <div className="price-original">
                        ₹{item.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary rounded-lg shadow p-6 border border-amber-400/50">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="w-full mb-3 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-sm rounded-md hover:bg-[#6c3d25] cursor-pointer"
              onClick={() => navigate("/CheckOut")}
            >
              Proceed to Checkout
            </button>
            <p className="delivery-estimate">
              Estimated delivery by <strong>April 25, 2023</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
