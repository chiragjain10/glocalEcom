import React, { useState, useRef, useCallback } from 'react';
import { useProducts } from '../Context/ProductContext';
import { 
  CloudUploadIcon, 
  XIcon, 
  CheckCircleIcon,
  ExclamationIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/outline';
import { CATEGORY_OPTIONS, CATEGORY_MAP } from '../constants/categoryData';

const ProductForm = ({ onClose, editProduct = null }) => {
  const { addProduct, updateProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    title: editProduct?.title || '',
    description: editProduct?.description || '',
    price: editProduct?.price || '',
    maxPrice: editProduct?.maxPrice || '',
    category: editProduct?.category || '',
    subcategory: editProduct?.subcategory || '',
    stock: editProduct?.stock || '',
    rating: editProduct?.rating || '4.5',
    images: editProduct?.images || [],
    featured: editProduct?.featured || false,
    trending: editProduct?.trending || true,
    productTypes: editProduct?.productTypes || ['trending'] // Add new product types field
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const productTypes = [
    { key: 'newArrivals', label: 'New Arrivals' },
    { key: 'trending', label: 'Trending Products' },
    { key: 'bestsellers', label: 'Bestsellers' }
  ];

  const availableSubcategories = CATEGORY_MAP[formData.category]?.subcategories || [];

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Product title is required';
    if (!formData.description.trim()) newErrors.description = 'Product description is required';
    if (!formData.price) newErrors.price = 'Product price is required';
    if (!formData.category) newErrors.category = 'Product category is required';
    if (!formData.subcategory) newErrors.subcategory = 'Subcategory is required';
    if (!formData.stock) newErrors.stock = 'Stock quantity is required';
    if (formData.images.length === 0) newErrors.images = 'At least one product image is required';
    if (formData.productTypes.length === 0) newErrors.productTypes = 'At least one product type is required';
    
    if (formData.price && isNaN(formData.price)) newErrors.price = 'Price must be a valid number';
    if (formData.maxPrice && isNaN(formData.maxPrice)) newErrors.maxPrice = 'Maximum price must be a valid number';
    if (formData.price && formData.maxPrice && !isNaN(formData.price) && !isNaN(formData.maxPrice)) {
      if (parseFloat(formData.maxPrice) <= parseFloat(formData.price)) {
        newErrors.maxPrice = 'Maximum price must be greater than the current price';
      }
    }
    if (formData.stock && isNaN(formData.stock)) newErrors.stock = 'Stock must be a valid number';
    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) newErrors.rating = 'Rating must be between 0 and 5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'glocalship');
    formData.append('cloud_name', 'dcjn4y284');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcjn4y284/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.secure_url) {
        throw new Error('No secure URL returned from Cloudinary');
      }
      
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  const handleImageUpload = async (files) => {
    if (files.length === 0) return;

    // Filter only image files
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      setErrors({ images: 'Please select valid image files (PNG, JPG, GIF)' });
      return;
    }

    // Check file sizes (max 10MB each)
    const oversizedFiles = imageFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors({ images: 'Some files exceed 10MB limit. Please select smaller files.' });
      return;
    }

    setUploadingImages(true);
    setUploadProgress(0);
    setErrors({});
    
    try {
      const uploadPromises = imageFiles.map(async (file, index) => {
        try {
          const url = await uploadToCloudinary(file);
          setUploadProgress(((index + 1) / imageFiles.length) * 100);
          return url;
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          return null;
        }
      });

      const uploadedUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);
      
      if (uploadedUrls.length === 0) {
        throw new Error('Failed to upload any images. Please try again.');
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setErrors({ images: error.message });
    } finally {
      setUploadingImages(false);
      setUploadProgress(0);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    // Clear image error if we still have images left
    if (formData.images.length > 1 && errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const moveImage = (index, direction) => {
    const newImages = [...formData.images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newImages.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        ...(formData.maxPrice
          ? { maxPrice: parseFloat(formData.maxPrice) }
          : { maxPrice: null }),
        stock: parseInt(formData.stock),
        rating: parseFloat(formData.rating),
        priceFormatted: `₹${formData.price}`,
        updatedAt: new Date(),
        ...(!editProduct && { createdAt: new Date() }) // Only add createdAt for new products
      };

      const result = editProduct 
        ? await updateProduct(editProduct.id, productData)
        : await addProduct(productData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        throw new Error(result.message || 'Operation failed');
      }
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (name === 'category') {
        const shouldKeepSubcategory = prev.category === value;
        return {
          ...prev,
          category: value,
          subcategory: shouldKeepSubcategory ? prev.subcategory : '',
        };
      }
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (name === 'category' && errors.subcategory) {
      setErrors(prev => ({ ...prev, subcategory: '' }));
    }
    if (name === 'maxPrice' && errors.maxPrice) {
      setErrors(prev => ({ ...prev, maxPrice: '' }));
    }
  };

  const handleProductTypeChange = (typeKey) => {
    setFormData(prev => ({
      ...prev,
      productTypes: prev.productTypes.includes(typeKey)
        ? prev.productTypes.filter(type => type !== typeKey)
        : [...prev.productTypes, typeKey]
    }));
    
    // Clear error when user makes selection
    if (errors.productTypes) {
      setErrors(prev => ({ ...prev, productTypes: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex mt-19 items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700 font-medium">
                {editProduct ? 'Product updated successfully!' : 'Product added successfully!'}
              </span>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <ExclamationIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{errors.submit}</span>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="product-title" className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                id="product-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter product title"
                maxLength={100}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="product-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            <div>
              <label htmlFor="product-subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory *
              </label>
              <select
                id="product-subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                disabled={!formData.category}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.subcategory ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } ${!formData.category ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              >
                <option value="">{formData.category ? 'Select subcategory' : 'Select category first'}</option>
                {availableSubcategories.map(subcategory => (
                  <option key={subcategory.value} value={subcategory.value}>{subcategory.label}</option>
                ))}
              </select>
              {errors.subcategory && (
                <p className="mt-1 text-sm text-red-600">{errors.subcategory}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="product-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Describe your product..."
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-max-price" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Price (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  id="product-max-price"
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.maxPrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Used to show discounts (original price).</p>
              {errors.maxPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.maxPrice}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-stock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                id="product-stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.stock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating (0-5)
              </label>
              <input
                id="product-rating"
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="4.5"
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images *
            </label>
            
            {/* Upload Area */}
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-amber-500 bg-amber-50' 
                  : errors.images 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 hover:border-amber-400'
              }`}
            >
              <CloudUploadIcon className={`mx-auto h-12 w-12 mb-4 ${
                dragActive ? 'text-amber-500' : 'text-gray-400'
              }`} />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
                  >
                    <span>Upload images</span>
                    <input
                      id="image-upload"
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleImageUpload(e.target.files)}
                    />
                  </label>
                  {' '}or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadingImages && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Uploading images...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Uploaded Images */}
            {formData.images.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Uploaded Images ({formData.images.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/96x96?text=Image+Error';
                        }}
                      />
                      <div className="absolute top-1 right-1 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => moveImage(index, 'up')}
                            className="bg-white text-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-100"
                            aria-label="Move image up"
                          >
                            <ArrowUpIcon className="h-3 w-3" />
                          </button>
                        )}
                        {index < formData.images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveImage(index, 'down')}
                            className="bg-white text-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-100"
                            aria-label="Move image down"
                          >
                            <ArrowDownIcon className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                          aria-label="Remove image"
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center truncate">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Types *
            </label>
            <div className="flex flex-wrap items-center gap-6">
              {productTypes.map((type) => (
                <label key={type.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.productTypes.includes(type.key)}
                    onChange={() => handleProductTypeChange(type.key)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
            {errors.productTypes && (
              <p className="mt-1 text-sm text-red-600">{errors.productTypes}</p>
            )}
          </div>

          {/* Legacy Options (Hidden but maintained for backward compatibility) */}
          <div className="hidden">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Featured Product</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="trending"
                checked={formData.trending}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Trending Product</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editProduct ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editProduct ? 'Update Product' : 'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;