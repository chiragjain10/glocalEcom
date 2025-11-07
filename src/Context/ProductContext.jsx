
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';


const ProductContext = createContext();


export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
      setProducts(productsData);
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new product
  const addProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      const newProduct = {
        id: docRef.id,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setProducts(prev => [newProduct, ...prev]);
      return { success: true, productId: docRef.id };
    } catch (err) {
      setError('Failed to add product: ' + err.message);
      console.error('Error adding product:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (productId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, ...updateData, updatedAt: new Date() }
          : product
      ));
      
      return { success: true };
    } catch (err) {
      setError('Failed to update product: ' + err.message);
      console.error('Error updating product:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (productId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteDoc(doc(db, 'products', productId));
      
      setProducts(prev => prev.filter(product => product.id !== productId));
      return { success: true };
    } catch (err) {
      setError('Failed to delete product: ' + err.message);
      console.error('Error deleting product:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get trending products (most recent 6)
  const getTrendingProducts = useCallback(() => {
    return products.filter(product => 
      product.productTypes && product.productTypes.includes('trending')
    ).slice(0, 6);
  }, [products]);

  // Get new arrivals products
  const getNewArrivals = useCallback(() => {
    return products.filter(product => 
      product.productTypes && product.productTypes.includes('newArrivals')
    ).slice(0, 6);
  }, [products]);

  // Get bestseller products
  const getBestsellers = useCallback(() => {
    return products.filter(product => 
      product.productTypes && product.productTypes.includes('bestsellers')
    ).slice(0, 6);
  }, [products]);

  // Get products by product type
  const getProductsByType = useCallback((type) => {
    return products.filter(product => 
      product.productTypes && product.productTypes.includes(type)
    );
  }, [products]);

  // Get product by ID
  const getProductById = useCallback((productId) => {
    return products.find(product => product.id === productId);
  }, [products]);

  // Get products by category
  const getProductsByCategory = useCallback((category) => {
    return products.filter(product => product.category === category);
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = React.useMemo(() => ({
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    getTrendingProducts,
    getNewArrivals,
    getBestsellers,
    getProductsByType,
    getProductById,
    getProductsByCategory
  }), [
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    getTrendingProducts,
    getNewArrivals,
    getBestsellers,
    getProductsByType,
    getProductById,
    getProductsByCategory
  ]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

