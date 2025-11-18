import React, { useState, useEffect, useCallback } from 'react';
import { useProducts } from '../Context/ProductContext';
import ProductForm from './ProductForm';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/outline';
import { formatCurrency, calculateDiscountPercentage } from '../lib/pricing';
import { CATEGORY_OPTIONS, CATEGORY_MAP } from '../constants/categoryData';

const ProductManagement = () => {
  const { products, loading, error, deleteProduct, fetchProducts } = useProducts();
  
  // Debug: Log products to see the data structure
  console.log('Products in ProductManagement:', products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const categoryOptions = CATEGORY_OPTIONS;
  const availableSubcategories = selectedCategory ? (CATEGORY_MAP[selectedCategory]?.subcategories || []) : [];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory('');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      const result = await deleteProduct(productToDelete.id);
      if (result.success) {
        setShowDeleteConfirm(false);
        setProductToDelete(null);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    const deletePromises = selectedProducts.map(id => deleteProduct(id));
    await Promise.all(deletePromises);
    setSelectedProducts([]);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
        const matchesProductType = !selectedProductType || product.productTypes?.includes(selectedProductType);
        return matchesSearch && matchesCategory && matchesSubcategory && matchesProductType;
      })
      .sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'price') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [products, searchTerm, selectedCategory, selectedProductType, sortBy, sortOrder]);

  const getStatusBadge = (product) => {
    if (product.stock === 0) {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Out of Stock</span>;
    } else if (product.stock < 10) {
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>;
    } else {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">In Stock</span>;
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return <div className="flex items-center">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Product Management</h3>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {products.filter(p => p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">New Arrivals</p>
          <p className="text-2xl font-bold text-blue-600">
            {products.filter(p => p.productTypes && p.productTypes.includes('newArrivals')).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Trending</p>
          <p className="text-2xl font-bold text-amber-600">
            {products.filter(p => p.productTypes && p.productTypes.includes('trending')).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Bestsellers</p>
          <p className="text-2xl font-bold text-purple-600">
            {products.filter(p => p.productTypes && p.productTypes.includes('bestsellers')).length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categoryOptions.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          {/* Subcategory Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">{selectedCategory ? 'All Subcategories' : 'Select category first'}</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory.value} value={subcategory.value}>{subcategory.label}</option>
              ))}
            </select>
          </div>

          {/* Product Type Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Product Types</option>
              <option value="newArrivals">New Arrivals</option>
              <option value="trending">Trending Products</option>
              <option value="bestsellers">Bestsellers</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Date Updated</option>
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="rating">Rating</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'asc' ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-amber-800">
              {selectedProducts.length} product(s) selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Types
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                                                 <img
                           className="h-12 w-12 rounded-lg object-cover"
                           src={product.images?.[0] || 'https://via.placeholder.com/48x48?text=No+Image'}
                           alt={product.title}
                           onError={(e) => {
                             console.error('Product image failed to load:', product.images?.[0]);
                             e.target.src = 'https://via.placeholder.com/48x48?text=Error';
                           }}
                         />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {product.subcategory || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {product.productTypes?.join(', ') || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(product.price) || `₹${product.price}`}
                      </span>
                      {product.maxPrice && product.maxPrice > product.price && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatCurrency(product.maxPrice) || `₹${product.maxPrice}`}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const discount = calculateDiscountPercentage(product.price, product.maxPrice);
                      return discount ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {discount}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRatingStars(product.rating)}
                      <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-amber-600 hover:text-amber-900 p-1 rounded hover:bg-amber-50"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory || selectedProductType ? 'Try adjusting your search or filters.' : 'Get started by adding your first product.'}
            </p>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          editProduct={editingProduct}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
