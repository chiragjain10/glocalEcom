import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './HomePagemain/Homepage';
import CetegoriesPagelayout from './CetegoriesPagelayout';
// import Contact from './Contact';
import Wishlist from './auth/Wishlist';
import AddtoCart from './auth/AddtoCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import User from './auth/User';
import Checkout from './HomePagemain/CheckOut';
import About from './About';
import SignUpPage from './HomePagemain/SignUpPage';
import LogInPage from './HomePagemain/LogInPage';


import './App.css';
import FeaturedProducts from './HomePagemain/FeaturedProducts';
import ProductDetails from './HomePagemain/ProductDetails';
import { ProductProvider } from './HomePagemain/ProductContext';

function App() {
  return (
    <Router>
      <ProductProvider> {/* ✅ Wrap everything inside */}
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<AddtoCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<User />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/featuredproducts" element={<FeaturedProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            
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
      </ProductProvider>
    </Router>
  );
}

export default App;
