import React, { useState, useEffect } from 'react';
import { CATEGORY_DATA, CATEGORY_MAP } from '../constants/categoryData';
import { useProducts } from '../Context/ProductContext';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import { useAuth } from '../Context/AuthContext';
import { FiShoppingCart, FiEye, FiHeart, FiStar, FiPackage, FiTruck, FiCheck, FiX } from 'react-icons/fi';
import { 
  FaHeadphonesAlt, FaGem, FaPaintBrush, FaGopuram,
  FaBookOpen, FaTshirt, FaHome, FaCrown, FaTags
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toastCart, toastWishlist } from '../components/ui/use-toast';
import { formatCurrency, calculateDiscountPercentage } from '../lib/pricing';

// Icon mapping for categories
const CATEGORY_ICONS = {
  'Pottery': <FaGem />,
  // 'Textiles': <FaGem />,
  'Handicrafts': <FaGem />,
  'Jewelry': <FaGem />,
  // 'Home Decor': <FaHome />,
  // 'Kitchen & Dining': <FaHome />,
  // 'Furniture': <FaHome />,
  // 'Art & Craft': <FaPaintBrush />,
  'Clothing': <FaTshirt />,
  // 'Beauty & Wellness': <FaGem />,
  'Books': <FaBookOpen />,
  // 'Audio Video': <FaHeadphonesAlt />,
  // 'Paintings': <FaPaintBrush />,
  'Statues': <FaGopuram />,
  // 'Clothing & More': <FaTshirt />,
  // 'Home & Living': <FaHome />,
  // 'Luxe': <FaCrown />,
  'Best Deals': <FaTags />
};

// Convert CATEGORY_DATA to format compatible with existing code
const categories = CATEGORY_DATA.map(cat => ({
  title: cat.label,
  value: cat.value,
  icon: CATEGORY_ICONS[cat.value] || <FaGem />
}));

const CategoryLayout = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedMain, setSelectedMain] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const { mainCategory } = useParams();

  const [cartFeedback, setCartFeedback] = useState({ show: false, productId: null, type: '' });
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const normalizedMainTitle = selectedMain?.title?.trim() || '';
  const categoryValue = selectedMain?.value || normalizedMainTitle;
  const selectedCategoryConfig = CATEGORY_MAP[categoryValue] || null;
  const availableSubcategories = selectedCategoryConfig?.subcategories || [];
  const isBestDeals = categoryValue === 'Best Deals';

  useEffect(() => {
    if (mainCategory) {
      const decodedCategory = decodeURIComponent(mainCategory).toLowerCase();
      const match = categories.find(cat => 
        cat.title.toLowerCase() === decodedCategory || 
        cat.value.toLowerCase() === decodedCategory
      );
      if (match) {
        setSelectedMain(match);
        setSelectedSubcategory('');
        return;
      }
    }
    // fallback to first category
    if (categories.length > 0) {
      setSelectedMain(categories[0]);
      setSelectedSubcategory('');
    }
  }, [mainCategory]);

  // Filter products based on selected main and sub categories
  useEffect(() => {
    if (!selectedMain) {
      setFilteredProducts([]);
      return;
    }

    const normalizedTitle = selectedMain.title?.trim() || '';
    const categoryValue = selectedMain?.value || normalizedTitle;
    
    // Special handling for "Best Deals" - show all bestseller items
    if (categoryValue === 'Best Deals') {
      const bestsellers = products.filter(product => 
        product.productTypes && product.productTypes.includes('bestsellers')
      );
      setFilteredProducts(bestsellers);
      setCurrentPage(1);
      return;
    }

    const categoryConfig = CATEGORY_MAP[categoryValue] || null;
    const mainKeywords = categoryConfig?.keywords || (normalizedTitle ? [normalizedTitle.toLowerCase()] : []); 
    const subcategoryConfig = selectedSubcategory
      ? categoryConfig?.subcategories?.find((sub) => sub.value === selectedSubcategory)
      : null;
    const subcategoryKeywords = subcategoryConfig?.keywords || [];

    const filtered = products.filter(product => {
      const productCategory = product.category?.toLowerCase() || '';
      const productTitle = product.title?.toLowerCase() || '';
      const productDescription = product.description?.toLowerCase() || '';

      const matchesMain = !normalizedTitle
        ? true
        : productCategory === normalizedTitle.toLowerCase() ||
          mainKeywords.some(keyword =>
            productCategory.includes(keyword) ||
            productTitle.includes(keyword) ||
            productDescription.includes(keyword)
          );

      if (!matchesMain) return false;

      if (!selectedSubcategory) return true;

      if (product.subcategory === selectedSubcategory) return true;

      return subcategoryKeywords.some(keyword =>
        productCategory.includes(keyword) ||
        productTitle.includes(keyword) ||
        productDescription.includes(keyword)
      );
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedMain, selectedSubcategory, products]);

  const handleMainClick = (cat) => {
    setSelectedMain(cat);
    setSelectedSubcategory('');
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    
    // Show premium toast notification
    toastCart(
      "Added to Cart! 🛒",
      `${product.title} has been added to your shopping cart.`,
      { duration: 3000 }
    );
    
    // Show feedback
    setCartFeedback({ show: true, productId: product.id, type: 'cart' });
    setTimeout(() => {
      setCartFeedback({ show: false, productId: null, type: '' });
    }, 2000);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
      toastWishlist(
        "Removed from Wishlist 💔",
        `${product.title} has been removed from your wishlist.`,
        { duration: 3000 }
      );
      setCartFeedback({ show: true, productId: product.id, type: 'wishlist-remove' });
    } else {
      addToWishlist(product);
      toastWishlist(
        "Added to Wishlist! ❤️",
        `${product.title} has been added to your wishlist.`,
        { duration: 3000 }
      );
      setCartFeedback({ show: true, productId: product.id, type: 'wishlist-add' });
    }
    
    setTimeout(() => {
      setCartFeedback({ show: false, productId: null, type: '' });
    }, 2000);
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic cultural artifacts, spiritual items, and traditional crafts from around the world
          </p>
        </div>

        {/* Main Categories - Enhanced Design */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-3 justify-center max-w-5xl">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleMainClick(cat)}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedMain?.title === cat.title
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200/50 hover:border-amber-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  {cat.title}
                </span>
                {selectedMain?.title === cat.title && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      {selectedMain && (
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-24">
              {!isBestDeals && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Subcategories</h3>
                      <p className="text-sm text-gray-500">Refine your view</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-semibold">
                      {availableSubcategories.length || '–'}
                    </div>
                  </div>
                  {availableSubcategories.length > 0 ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSubcategory('')}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-all ${
                      selectedSubcategory === ''
                        ? 'bg-amber-500 text-white border-amber-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:text-amber-600'
                    }`}
                  >
                    All in {selectedMain?.title}
                  </button>
                  {availableSubcategories.map((subcategory) => (
                    <button
                      key={subcategory.value}
                      type="button"
                      onClick={() => setSelectedSubcategory(subcategory.value)}
                      className={`w-full text-left px-3 py-2 rounded-xl border transition-all ${
                        selectedSubcategory === subcategory.value
                          ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-inner'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{subcategory.label}</span>
                        {selectedSubcategory === subcategory.value && <FiCheck className="w-4 h-4 text-amber-600" />}
                      </div>
                    </button>
                  ))}
                </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No curated subcategories for this selection yet.
                    </p>
                  )}
                </>
              )}
              {isBestDeals && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FaTags className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Deals</h3>
                  <p className="text-sm text-gray-600">
                    Showing our bestseller products with great discounts!
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedMain?.title || 'Browse Items'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    {selectedSubcategory && ` · ${selectedSubcategory}`}
                  </p>
                </div>
                
                {/* Category Badge */}
                <div className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full">
                  <span className="text-sm font-medium text-amber-800">
                    {selectedMain?.title}
                  </span>
                </div>
              </div>
              
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((product, idx) => {
                    const isInWishlist = wishlist.some(item => item.id === product.id);
                    const isInCart = false; // You can implement cart checking if needed
                    
                    const discount = calculateDiscountPercentage(product.price, product.maxPrice);
                    const displayPrice = formatCurrency(product.price) || `₹${product.price || '0'}`;
                    const displayMaxPrice = formatCurrency(product.maxPrice);
                    const showMaxPrice = discount && displayMaxPrice;
                    return (
                      <div
                        key={product.id}
                        className="group relative bg-white rounded-2xl border border-gray-200/50 hover:border-amber-300 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer transform hover:-translate-y-1"
                        onMouseEnter={() => setHoveredItem(idx)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleProductClick(product)}
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          
                          {/* Product Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.featured && (
                              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                                Featured
                              </span>
                            )}
                            {product.trending && (
                              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                                Trending
                              </span>
                            )}
                          </div>
                          
                          {discount && (
                            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                              {discount}% OFF
                            </span>
                          )}
                          
                          {/* Action Icons - visible on mobile, hover on md+ */}
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center gap-3 pb-4 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100`}>
                            <button 
                              className={`p-3 rounded-full text-white transition-all transform hover:scale-110 shadow-lg ${
                                isInCart 
                                  ? 'bg-green-500 hover:bg-green-600' 
                                  : 'bg-amber-500 hover:bg-amber-600'
                              }`}
                              title={isInCart ? 'Added to cart' : 'Add to cart'}
                              onClick={(e) => handleAddToCart(e, product)}
                            >
                              {isInCart ? <FiCheck className="w-5 h-5" /> : <FiShoppingCart className="w-5 h-5" />}
                            </button>
                            
                            
                            
                            <button 
                              className={`p-3 rounded-full transition-all transform hover:scale-110 shadow-lg ${
                                isInWishlist
                                  ? 'bg-red-500 text-white hover:bg-red-600'
                                  : 'bg-white/95 backdrop-blur-sm text-amber-600 hover:bg-amber-500 hover:text-white'
                              }`}
                              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                              onClick={(e) => handleWishlistToggle(e, product)}
                            >
                              <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 mb-2">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {product.description}
                            </p>
                          </div>
                          
                          {/* Product Meta */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <FiStar className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="text-sm font-medium text-gray-700">
                                {product.rating || '4.5'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <FiPackage className="w-4 h-4" />
                              <span className="text-xs">{product.stock || 0} in stock</span>
                            </div>
                          </div>
                          
                          {/* Price and Category */}
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-amber-600 flex flex-col">
                              <span>{displayPrice}</span>
                              {showMaxPrice && (
                                <span className="text-sm font-medium text-gray-500 line-through">
                                  {displayMaxPrice}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {product.category || 'General'}
                            </div>
                          </div>
                        </div>

                        {/* Feedback Messages */}
                        {cartFeedback.show && cartFeedback.productId === product.id && (
                          <div className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-white text-sm font-medium shadow-lg transition-all duration-300 ${
                            cartFeedback.type === 'cart' ? 'bg-green-500' :
                            cartFeedback.type === 'wishlist-add' ? 'bg-red-500' :
                            cartFeedback.type === 'wishlist-remove' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}>
                            {cartFeedback.type === 'cart' && 'Added to cart!'}
                            {cartFeedback.type === 'wishlist-add' && 'Added to wishlist!'}
                            {cartFeedback.type === 'wishlist-remove' && 'Removed from wishlist!'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>

                  {/* Pagination Controls */}
                  {filteredProducts.length > itemsPerPage && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Per page selector */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Items per page:</span>
                        <select
                          className="border border-gray-200 rounded-lg px-3 py-2 bg-white"
                          value={itemsPerPage}
                          onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        >
                          <option value={8}>8</option>
                          <option value={12}>12</option>
                          <option value={16}>16</option>
                          <option value={24}>24</option>
                        </select>
                      </div>

                      {/* Page buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white disabled:opacity-50"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            className={`w-9 h-9 rounded-lg border text-sm font-medium ${page === currentPage ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-700 border-gray-200'}`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white disabled:opacity-50"
                          disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                          onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredProducts.length / itemsPerPage), p + 1))}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* No Products Found - Enhanced Design */
                <div className="py-16 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto flex items-center justify-center">
                        <FiPackage className="w-12 h-12 text-gray-400" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <FiTruck className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      We don't have any products in the "{selectedMain?.title}" category yet.
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">
                        Try selecting a different category or check back later for new arrivals.
                      </p>
                      <Link 
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <span>Browse All Products</span>
                        <FiEye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* Quick View Modal */}
      
    </div>
  );
};

export default CategoryLayout;