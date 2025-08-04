import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './HomePagemain/Homepage';
import CetegoriesPagelayout from './CetegoriesPagelayout';
import Contact from './Contact';
import Wishlist from './auth/Wishlist';
import AddtoCart from './auth/AddtoCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import User from './auth/User';
import Checkout from './HomePagemain/CheckOut';
import About from './About';

import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/all-categories" element={<CetegoriesPagelayout />} />
          <Route path="/all-categories/:mainCategory" element={<CetegoriesPagelayout />} />
          <Route path="/all-categories/:mainCategory/:subCategory" element={<CetegoriesPagelayout />} />
           <Route path='/about' element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<AddtoCart />} />
          <Route path="/CheckOut" element={<Checkout />} />
          <Route path="/account" element={<User />} />

          {/* Optional: 404 Page */}
          <Route path="*" element={
            <div className="text-center py-20 text-gray-600 text-xl">
              404 - Page Not Found
            </div>
          } />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
