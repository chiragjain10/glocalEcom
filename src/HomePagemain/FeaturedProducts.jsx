import React from "react";
import Slider from "react-slick";
import {
  FaStar,
  FaHeart,
  FaEye,
  FaShoppingCart,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiEye, FiHeart } from 'react-icons/fi';

const NewArrival = () => {
  const products = [
    {
      id: 1,
      title: "Handmade Pot",
      description: "Handcrafted by Indian artisans",
      price: "₹899",
      rating: 4.8,
      image: "https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg",
    },
    {
      id: 2,
      title: "Decorative Plate",
      description: "Painted with cultural motifs",
      price: "₹499",
      rating: 4.5,
      image: "https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXb2_K3vluQzr5AkNu263uZRnNrom71NtMg&s",
    },
    {
      id: 5,
      title: 'Limited Edition',
      category: 'Hindu',
      price: "$1299.97",
      image: "https://via.placeholder.com/300x300?text=Limited"
    },
    {
      id: 6,
      title: 'Economy Choice',
      category: 'Hindu',
      price: "$79.97",
      image: "https://via.placeholder.com/300x300?text=Economy"
    }
  ];

  const [visibleCards, setVisibleCards] = useState(4);
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const cardWidth = slider.firstChild?.offsetWidth + 20;
      const scrollPosition = slider.scrollLeft;
      const newActiveDot = Math.round(scrollPosition / (visibleCards * cardWidth));
      setActiveDot(newActiveDot);
    };

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [visibleCards]);

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.firstChild?.offsetWidth + 20;
    slider.scrollTo({
      left: index * visibleCards * cardWidth,
      behavior: 'smooth'
    });
  };

  const ProductCard = ({ product }) => (
    <div className="slider-card relative">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow">
        <span className="new-badge">New</span>
      </div>

      <div className="slider-image-wrapper">
        <img src={product.image} alt={product.title} className="slider-image" />
        <div className="slider-icon-overlay">
          <FaHeart className="icon heart-icon" />
          <FaShoppingCart className="icon cart-icon" />
          <Link to={`/product/${product.id}`}>
            <FaEye className="icon eye-icon cursor-pointer" />
          </Link>
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

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      scrollToSlide(Math.min(activeDot + 1, Math.ceil(products.length / visibleCards) - 1));
    }

    if (touchStart - touchEnd < -50) {
      scrollToSlide(Math.max(activeDot - 1, 0));
    }
  };

  return (
    <div className="slider-section bg-[#F4F2E9]">
      <div className="slider-top">
        <div className="slider-heading-row">
          <div className="heading-with-line">
            <h2 className="slider-heading ">Featured Products</h2>
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

export default NewArrival;
