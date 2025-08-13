import React from 'react';
import Slider from 'react-slick';
import {
  FaStar,
  FaFire,
  FaHeart,
  FaEye,
  FaShoppingCart
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TrendingProducts = () => {
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
    infinite: true,
    speed: 600,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const ProductCard = ({ product }) => (
    <div className="slider-card relative ">
      <div className="absolute top-3 left-3 z-10">
        <span className="trending-badge">Trending</span>
      </div>

      <div className="slider-image-wrapper">
        <img src={product.image} alt={product.title} className="slider-image" />
        <div className="slider-icon-overlay">
          <FaHeart className="icon heart-icon" />
          <FaShoppingCart className="icon cart-icon" />
          <FaEye className="icon eye-icon" />
        </div>
      </div>

      <div className="slider-content">
        <h2 className="slider-title">{product.title}</h2>
        <p className="slider-description">{product.description}</p>
        <div className="slider-footer">
          <p className="slider-price">{product.price}</p>
          <div className="slider-rating">
            <FaStar className="star-icon" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="slider-section bg-[#F4F2E9]">
      <div className="slider-top">
        <div className="slider-heading-row">
          <div className="slider-icon">
            <FaStar className="icon-star text-white" />
          </div>
              <div className="heading-with-line">
      <h2 className="slider-heading ">Trending Products</h2>
      <div className="heading-underline-new"></div>
    </div>
        </div>
        
        <p className="slider-subtext">
          Discover the latest additions to our collection, carefully curated for your unique style.
        </p>
      </div>

     

      <div className="slider-wrapper">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="slider-slide">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingProducts;
