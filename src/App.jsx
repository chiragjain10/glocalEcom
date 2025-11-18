import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './BackToTop';

import './App.css';
import { AuthProvider } from './Context/AuthContext';
import { ProductProvider } from './Context/ProductContext';
import Homepage from './HomePagemain/Homepage';
import HomepageCetegories from './HomePagemain/HomepageCetegories';
import CetegoriesPagelayout from './Pages/CetegoriesPagelayout';
import ContactUs from './Pages/Contact';
import Wishlist from './user/Wishlist';
import AddtoCart from './user/AddtoCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import User from './user/User';
import Checkout from './HomePagemain/CheckOut';
import PaymentPage from './HomePagemain/PaymentPage';
import PaynmemntSuccess from './Pages/PaynmemntSuccess';
import PaynmemntFaild from './Pages/PaynmemntFaild';
import About from './Pages/About';
import Reviews from './Pages/Reviews';
import Updates from './Pages/Updates';
import Career from './Pages/Career';
import Vlog from './Pages/Vlog';
import News from './Pages/News';
import SignUpPage from './auth/SignUpPage';
import LogInPage from './auth/LogInPage';
import ProductDetails from './Pages/Product';
import AdminDashboard from './admin/adminPage';
import AdminLogin from './admin/adminlogin';
import PageNotFound1 from './HomePagemain/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { WishlistProvider } from './Context/WishlistContext';
import { CartProvider } from "./Context/CartContext";
import Toaster from './components/ui/toaster';


function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProductProvider>
          <WishlistProvider>
            <CartProvider>
              <Router>
              <ScrollToTop />
                <div className="app">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/updates" element={<Updates />} />
                    <Route path="/career" element={<Career />} />
                    <Route path="/vlog" element={<Vlog />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/home-categories" element={<HomepageCetegories />} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/cart" element={<AddtoCart />} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
                    <Route path="/payment-success" element={<PaynmemntSuccess />} />
                    <Route path="/payment-failed" element={<PaynmemntFaild />} />
                    <Route path="/account" element={<ProtectedRoute><User /></ProtectedRoute>} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/product/:id" element={<ProductDetails />} />


                    {/* admin  */}
                    <Route path="/adminlogin" element={<AdminLogin />} />

                    {/* Category paths */}
                    <Route path="/all-categories" element={<CetegoriesPagelayout />} />
                    <Route path="/all-categories/:mainCategory" element={<CetegoriesPagelayout />} />

                    {/* 404 fallback */}
                    <Route path="*" element={<PageNotFound1 />} />
                  </Routes>
                  <Footer />
                  <Toaster />
                </div>
              </Router>
            </CartProvider>
          </WishlistProvider>
        </ProductProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
