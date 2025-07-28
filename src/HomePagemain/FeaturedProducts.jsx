import React from 'react';
import { FaHeart, FaShoppingCart, FaArrowRight } from 'react-icons/fa';


const products = [
  {
    id: 1,
    title: 'Handmade Musician',
    type: 'Tribal Art',
    image: 'https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg',
  },
  {
    id: 2,
    title: 'Copper Craft Bowl',
    type: 'Copper Craft',
    image: 'https://cdn.pixabay.com/photo/2024/12/23/07/48/heavenly-bamboo-9286035_1280.jpg',
  },
  {
    id: 3,
    title: 'Wooden Peacock Carving',
    type: 'Wood Carving',
    image: 'https://cdn.pixabay.com/photo/2013/01/05/21/02/art-74050_1280.jpg',
  },
  {
    id: 4,
    title: 'Red Lacquer Toys',
    type: 'Channapatna Wood',
    image: 'https://cdn.pixabay.com/photo/2017/07/26/22/35/wooden-mask-2543403_1280.jpg',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section">
      <h2 className="featured-heading">Best Sellers</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="hover-actions">
                <button className="hover-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="hover-btn">
                  <FaHeart /> Wishlist
                </button>
              </div>
            </div>
            <div className="product-info">
              <p className="product-type">{product.type}</p>
              <h3 className="product-title">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn">
        View All <FaArrowRight style={{ marginLeft: '6px' }} />
      </button>
    </section>
  );
};

export default FeaturedProducts;
