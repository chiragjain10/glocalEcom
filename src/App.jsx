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
<<<<<<< HEAD
import About from './About';
=======
import SignUpPage from './HomePagemain/SignUpPage';
import LogInPage from './HomePagemain/LogInPage';
>>>>>>> c824b54cad2573f652a20dc64724a0c952d912df

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
<<<<<<< HEAD
          <Route path="/account" element={<User />} />
=======
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
>>>>>>> c824b54cad2573f652a20dc64724a0c952d912df

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
