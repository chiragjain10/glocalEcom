import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';
import Homepage from './HomePagemain/Homepage';
import CetegoriesPagelayout from './Pages/CetegoriesPagelayout';

import Contact from './Pages/Contact';

import Wishlist from './auth/Wishlist';
import AddtoCart from './auth/AddtoCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import User from './auth/User';
import Checkout from './HomePagemain/CheckOut';
import About from './Pages/About';
import SignUpPage from './HomePagemain/SignUpPage';
import LogInPage from './HomePagemain/LogInPage';
import QuickViewPage from './auth/QuickView';

import ProductDetails from './Pages/Producat';
import FeaturedProducts from './HomePagemain/FeaturedProducts';

import { ProductProvider } from './HomePagemain/ProductContext';
import { WishlistProvider } from './HomePagemain/WishlistContext'; // ✅ import wishlist context

import AdminDashboard from './admin/adminPage';
import AdminLogin from './admin/adminlogin';

import './App.css';


function App() {
  return (
    <Router>

      <ProductProvider>
        <WishlistProvider>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<AddtoCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<User />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/featuredproducts" element={<FeaturedProducts />} />
              <Route path="/quick-view/:id" element={<QuickViewPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* admin */}
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Category paths */}
              <Route path="/all-categories" element={<CetegoriesPagelayout />} />
              <Route path="/all-categories/:mainCategory" element={<CetegoriesPagelayout />} />
              <Route path="/all-categories/:mainCategory/:subCategory" element={<CetegoriesPagelayout />} />

              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div className="text-center py-20 text-gray-600 text-xl">
                    404 - Page Not Found
                  </div>
                }
              />
            </Routes>
            <Footer />
          </div>
        </WishlistProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
