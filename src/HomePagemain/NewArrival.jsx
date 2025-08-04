import React from "react";
import Slider from "react-slick";
import {
  FaStar,
  FaCrown,
  FaHeart,
  FaEye,
  FaShoppingCart,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewArrival = () => {
  const products = [
    {
      id: 1,
      title: "Handmade Pot",
      description: "Handcrafted by Indian artisans",
      price: "₹899",
      rating: 4.8,
      image:
        "https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg",
    },
    {
      id: 2,
      title: "Decorative Plate",
      description: "Painted with cultural motifs",
      price: "₹499",
      rating: 4.5,
      image:
        "https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg",
    },
    {
      id: 3,
      title: "Terracotta Mug",
      description: "Eco-friendly and elegant",
      price: "₹349",
      rating: 4.6,
      image: "https://m.media-amazon.com/images/I/71a+1jseHVL.jpg",
    },
    {
      id: 4,
      title: "Artisan Vase",
      description: "Traditional design and texture",
      price: "₹799",
      rating: 4.7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXb2_K3vluQzr5AkNu263uZRnNrom71NtMg&s",
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
    <div className="product-card relative">
      {/* 🔥 Trending Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow">
        <span>New</span>
      </div>

      {/* 📸 Image with overlay icons */}
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="best-seller-image"
        />
        <div className="icon-overlay">
          <FaHeart className="icon heart-icon" />
          <FaShoppingCart className="icon cart-icon" />
          <FaEye className="icon eye-icon" />
        </div>
      </div>

      {/* 📋 Content */}
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
          <div className="new-arrival-icon ">
            <FaStar className="crown" />
          </div>
          <h2 className="featured-heading">New Arrivals</h2>
        </div>
        <p className="featured-subtext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          fugiat, doloribus error, sapiente.
        </p>
      </div>

      {/* Desktop view (grid layout) */}
      <div className="featured-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile view (slider only on ≤576px) */}
      <div className="featured-slider">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewArrival;
