import React from 'react';


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
    <div className="bg-container">
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>Wishlist</h1>
        <div className="wishlist-controls">
          <a href="#">Sort</a>
          <span>·</span>
          <a href="#">Filter</a>
        </div>
      </div>
      <p className="wishlist-subtext">
        Your saved items are here. Easily move them to your cart.
      </p>

      <div className="wishlist-table">
        <div className="wishlist-table-header">
          <span>Product</span>
          <span>Price</span>
          <span>Stock status</span>
          <span>Action</span>
        </div>

        {wishlistData.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <div className="wishlist-product">
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <div className="details">{item.details}</div>
              </div>
            </div>
            <div className="wishlist-price">{item.price}</div>
            <div className="wishlist-stock">{item.stock}</div>
            <button className="wishlist-btn">ADD CART</button>
          </div>
        ))}
      </div>
 
    </div>
    </div>
  );

};

export default Wishlist;
