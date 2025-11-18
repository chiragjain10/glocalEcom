import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductContext";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import {
  FaChevronDown,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaShareAlt,
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaHandPaper,
  FaCheck,
  FaEye,
  FaTimes
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { formatCurrency, calculateDiscountPercentage } from "../lib/pricing";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Find product by ID
  const product = products.find((p) => p.id === parseInt(id));
  const discount = calculateDiscountPercentage(product?.price, product?.maxPrice);
  const displayPrice = formatCurrency(product?.price) || (product?.price ? `₹${product.price}` : null);
  const displayMaxPrice = formatCurrency(product?.maxPrice);
  const showMaxPrice = discount && displayMaxPrice;

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImageIndex(0);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The requested product could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image] || [];
  const isInWishlist = wishlist?.some((item) => item.id === product.id);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart({ ...product, quantity });
      // Show success feedback
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      setAddingToWishlist(true);
      if (isInWishlist) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setAddingToWishlist(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      setAddingToCart(true);
      await addToCart({ ...product, quantity });
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: <FaEye /> },
    { id: 'specifications', label: 'Specifications', icon: <FaCheck /> },
    { id: 'reviews', label: 'Reviews', icon: <FaStar /> },
    { id: 'shipping', label: 'Shipping', icon: <FaTruck /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 hover:text-amber-500 transition-colors"
            >
              <FaArrowLeft className="w-3 h-3" />
              Back
            </button>
            <span>/</span>
            <span className="text-gray-400">{product.category || 'Products'}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              {images.length > 0 ? (
                <div className="relative group cursor-pointer" onClick={() => setShowImageModal(true)}>
                  <img
                    src={images[selectedImageIndex]}
                    alt={product.title}
                    className="w-full h-96 object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
                    <FaEye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-3xl" />
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Image Available</span>
                </div>
              )}

              {/* Image Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-200"
                  >
                    <FaArrowLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-200"
                  >
                    <FaArrowLeft className="w-4 h-4 text-gray-600 rotate-180" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'border-amber-500 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-amber-300 hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl text-center border border-gray-200 shadow-sm">
                <FaShieldAlt className="mx-auto mb-2 text-2xl text-amber-500" />
                <h4 className="text-sm font-semibold text-gray-900">Secure Payments</h4>
                <p className="text-xs text-gray-600">100% safe & encrypted</p>
              </div>
              <div className="bg-white p-4 rounded-xl text-center border border-gray-200 shadow-sm">
                <FaTruck className="mx-auto mb-2 text-2xl text-amber-500" />
                <h4 className="text-sm font-semibold text-gray-900">Fast Delivery</h4>
                <p className="text-xs text-gray-600">Quick & reliable shipping</p>
              </div>
              <div className="bg-white p-4 rounded-xl text-center border border-gray-200 shadow-sm">
                <FaHandPaper className="mx-auto mb-2 text-2xl text-amber-500" />
                <h4 className="text-sm font-semibold text-gray-900">Handcrafted</h4>
                <p className="text-xs text-gray-600">Made in India</p>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating || 4.5) ? 'text-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating || 4.5} reviews)</span>
                <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-amber-500">
                {displayPrice || '₹0'}
              </div>
              {showMaxPrice && (
                <span className="text-2xl text-gray-400 line-through">{displayMaxPrice}</span>
              )}
              {discount && (
                <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-800">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <IoIosArrowForward className="text-amber-500 mt-1 flex-shrink-0" />
                  <span>Handcrafted by skilled Indian artisans</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <IoIosArrowForward className="text-amber-500 mt-1 flex-shrink-0" />
                  <span>Made with natural and eco-friendly materials</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <IoIosArrowForward className="text-amber-500 mt-1 flex-shrink-0" />
                  <span>Unique design - each piece is slightly different</span>
                </li>
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-lg">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300 bg-white font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {addingToCart ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaShoppingCart />
                )}
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              
              <button 
                onClick={handleBuyNow}
                disabled={addingToCart}
                className="flex-1 bg-white border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist and Share */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleWishlistToggle}
                disabled={addingToWishlist}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${
                  isInWishlist 
                    ? 'border-red-500 text-red-500 hover:bg-red-50' 
                    : 'border-amber-500 text-amber-500 hover:bg-amber-50'
                }`}
                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {addingToWishlist ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaHeart className="w-4 h-4" />
                )}
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all">
                <FaShareAlt className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {showMaxPrice && (
                  <div>
                    <span className="text-gray-500">Max Price:</span>
                    <span className="text-gray-700 font-medium ml-2 line-through">{displayMaxPrice}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-700 font-medium ml-2">{product.category || 'General'}</span>
                </div>
                <div>
                  <span className="text-gray-500">SKU:</span>
                  <span className="text-gray-700 font-medium ml-2">{product.id}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tags:</span>
                  <span className="text-gray-700 font-medium ml-2">Handmade, Artisan, Traditional</span>
                </div>
                <div>
                  <span className="text-gray-500">Availability:</span>
                  <span className="text-green-600 font-medium ml-2">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-8 py-4 font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-50'
                        : 'text-gray-500 hover:text-amber-500 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description} This beautiful handcrafted item is made using traditional techniques passed down through generations. 
                    Each piece is unique with slight variations that add to its charm. Perfect for home decoration or as a special gift.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Material</h4>
                      <p className="text-gray-600">Terracotta (Natural Clay)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Usage</h4>
                      <p className="text-gray-600">Water Storage, Home Décor, Planters</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Artisan</h4>
                      <p className="text-gray-600">Handcrafted by rural Indian potters</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Eco-friendly</h4>
                      <p className="text-gray-600">Yes, 100% natural materials</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b border-gray-200 pb-3">
                      <span className="font-medium text-gray-700">Dimensions:</span>
                      <span className="ml-2 text-gray-600">Varies by piece</span>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <span className="font-medium text-gray-700">Weight:</span>
                      <span className="ml-2 text-gray-600">Lightweight</span>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <span className="font-medium text-gray-700">Color:</span>
                      <span className="ml-2 text-gray-600">Natural terracotta</span>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <span className="font-medium text-gray-700">Finish:</span>
                      <span className="ml-2 text-gray-600">Natural, unglazed</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Customer Reviews</h3>
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Standard Shipping</h4>
                      <p className="text-gray-600">5-7 business days</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Express Shipping</h4>
                      <p className="text-gray-600">2-3 business days</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Free Shipping</h4>
                      <p className="text-gray-600">On orders above ₹999</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <FaTimes className="w-8 h-8" />
            </button>
            
            {images.length > 0 && (
              <div className="relative">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <FaArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <FaArrowLeft className="w-6 h-6 rotate-180" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
