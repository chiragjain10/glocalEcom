import React from 'react';
import Slider from 'react-slick';
import {
  FaStar,
  FaCrown,
  FaHeart,
  FaEye,
  FaShoppingCart,
  FaArrowRight,
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: 'Handmade Pot',
      description: 'Handcrafted by Indian artisans',
      price: '₹899',
      rating: 4.8,
      image: 'https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg',
    },
    {
      id: 2,
      title: 'Decorative Plate',
      description: 'Painted with cultural motifs',
      price: '₹499',
      rating: 4.5,
      image: 'https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg',
    },
    {
      id: 3,
      title: 'Terracotta Mug',
      description: 'Eco-friendly and elegant',
      price: '₹349',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/71a+1jseHVL.jpg',
    },
    {
      id: 4,
      title: 'Artisan Vase',
      description: 'Traditional design and texture',
      price: '₹799',
      rating: 4.7,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXb2_K3vluQzr5AkNu263uZRnNrom71NtMg&s',
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="best-seller-image" />
        <div className="icon-overlay">
          <FaHeart className="icon heart-icon text-rose-500" />
          <FaShoppingCart className="icon cart-icon text-amber-600" />
          <FaEye className="icon eye-icon text-gray-700" />
        </div>
      </div>
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <p className="product-price">{product.price}</p>
          <div className="product-rating">
            <FaStar className="star-icon text-yellow-500" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="featured-container bg-[#f4f2e9]">
      {/* Heading */}
      <div className="top-sec custom-border-box">
        <div className="heading-row">
          <div className="crown-icon">
            <FaCrown className="crown" />
          </div>
          <h2 className="featured-heading">Best Seller</h2>
        </div>
        <p className="featured-subtext text-center max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugiat, doloribus error, sapiente.
        </p>
      </div>

      {/* Desktop Grid View */}
      <div className="featured-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile Slider View */}
      <div className="featured-slider sm:hidden block mt-10">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <button className="relative text-white overflow-hidden px-6 py-3 rounded-md flex items-center gap-2 font-semibold text-black 
          bg-gradient-to-r from-amber-400 to-amber-500 
          transition-all duration-500 ease-in-out 
          hover:from-yellow-400 hover:to-orange-500 
          hover:shadow-xl group">
          <span className="relative z-10">View All</span>
          <FaArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg rounded-md"></span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
