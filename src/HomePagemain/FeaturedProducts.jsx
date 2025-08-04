import React from 'react';
import Slider from 'react-slick';
import {
  FaStar, FaCrown, FaHeart, FaEye, FaShoppingCart
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedProducts = () => {
<<<<<<< HEAD
  return (
    <div className="p-4 bg-gray-50 ">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 text-center p-4">Best Seller</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam, vero, adipisci velit assumenda dolores enim maiores.
      </p>
=======
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
>>>>>>> c824b54cad2573f652a20dc64724a0c952d912df

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
          <FaHeart className="icon heart-icon" />
          <FaShoppingCart className="icon cart-icon" />
          <FaEye className="icon eye-icon" />
        </div>
      </div>
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <p className="product-price">{product.price}</p>
          <div className="product-rating">
            <FaStar className="star-icon" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="featured-container bg-[#f4f2e9]">
      <div className="top-sec custom-border-box">
        <div className="heading-row">
          <div className="crown-icon">
            <FaCrown className="crown" />
          </div>
          <h2 className="featured-heading">Best Seller</h2>
        </div>
        <p className="featured-subtext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugiat, doloribus error, sapiente.
        </p>
      </div>

      {/* Desktop view (grid layout) */}
      <div className="featured-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

<<<<<<< HEAD
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
=======
      {/* Mobile view (slider only on ≤576px) */}
      <div className="featured-slider">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
>>>>>>> c824b54cad2573f652a20dc64724a0c952d912df
      </div>
    </div>
  );
};

export default FeaturedProducts;
