import React, { useState, useEffect, useRef } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductContext";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { toastCart } from "../components/ui/use-toast";
import { formatCurrency, calculateDiscountPercentage } from "../lib/pricing";

const TrendingProducts = () => {
  const [visibleCards, setVisibleCards] = useState(4);
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef(null);

  const { getTrendingProducts, loading } = useProducts();
  const trendingItems = getTrendingProducts();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [addingId, setAddingId] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);

  // Adjust visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) setVisibleCards(1);
      else if (window.innerWidth < 768) setVisibleCards(2);
      else if (window.innerWidth < 1024) setVisibleCards(3);
      else setVisibleCards(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle dot update on scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const cardWidth = slider.firstChild?.offsetWidth + 20;
      const scrollPosition = slider.scrollLeft;
      const newActiveDot = Math.round(
        scrollPosition / (visibleCards * cardWidth)
      );
      setActiveDot(newActiveDot);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [visibleCards]);

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.firstChild?.offsetWidth + 20;
    slider.scrollTo({
      left: index * visibleCards * cardWidth,
      behavior: "smooth",
    });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-10 px-5 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
            Trending Products
          </h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto"></div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!trendingItems || trendingItems.length === 0) {
    return (
      <section className="py-10 px-5 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
            Trending Products
          </h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto"></div>
        </div>
        <p className="text-center text-gray-500">
          No trending products available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="py-10 px-5 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
          Trending Products
        </h2>
        <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full shadow-lg" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-5 no-scrollbar"
        >
          {trendingItems.map((item) => {
            const isInWishlist = wishlist?.some((w) => w.id === item.id);
            const discount = calculateDiscountPercentage(item.price, item.maxPrice);
            const displayPrice = formatCurrency(item.price) || `₹${item.price ?? 0}`;
            const displayMaxPrice = formatCurrency(item.maxPrice);
            const showMaxPrice = discount && displayMaxPrice;
            return (
              <div
                key={item.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-10px)] md:w-[calc(33.33%-14px)] lg:w-[calc(25%-15px)] snap-start bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group border-2 border-transparent hover:border-amber-400 cursor-pointer"
                onClick={() => handleProductClick(item)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    <div className="bg-white/90 px-3 py-1 rounded-full shadow-sm">
                      <span className="font-bold text-gray-900">{displayPrice}</span>
                      {showMaxPrice && (
                        <span className="ml-2 text-xs text-gray-500 line-through">{displayMaxPrice}</span>
                      )}
                    </div>
                    {discount && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div
                    className={`
                      absolute bottom-3 left-0 right-0 flex justify-center gap-3
                      transition-all duration-500
                      md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0
                      opacity-100 translate-y-0
                    `}
                  >
                    {/* Add to Cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        (async () => {
                          try {
                            setAddingId(item.id);
                            await addToCart(item);
                            setLastAddedId(item.id);
                            toastCart(
                              "Added to Cart! 🛒",
                              `${item.title} has been added to your shopping cart.`,
                              { duration: 3000 }
                            );
                            setTimeout(() => setLastAddedId(null), 1000);
                          } finally {
                            setAddingId(null);
                          }
                        })();
                      }}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                      title="Add to cart"
                    >
                      {addingId === item.id ? (
                        <span className="inline-block w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      ) : lastAddedId === item.id ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <FiShoppingCart className="w-5 h-5" />
                      )}
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist) {
                          removeFromWishlist(item.id);
                        } else {
                          addToWishlist(item);
                        }
                      }}
                      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      className={`bg-white p-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-110 ${
                        isInWishlist
                          ? "text-red-500 bg-red-50 hover:bg-red-100"
                          : "hover:bg-amber-50 hover:text-amber-500"
                      }`}
                    >
                      <FiHeart className={`w-5 h-5 ${isInWishlist ? "text-red-500" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({
            length: Math.ceil(trendingItems.length / visibleCards),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-1 rounded-full transition-all duration-300 ${
                index === activeDot ? "bg-amber-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
