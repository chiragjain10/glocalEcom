import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f4f2e9] text-[#2c2c2c] px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-3">GlocalShipeComers</h2>
          <p className="text-sm mb-4">Delivering products globally with care and speed.</p>
          <h4 className="font-semibold text-sm mb-2">Subscribe to Newsletter</h4>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-black text-sm px-4 py-2 rounded-md hover:bg-[#6c3d25]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Updates</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="text-sm space-y-3">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-2xl bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text"/>  support@glocalshipe.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-2xl bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text" /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-2xl bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text " /> 3891 Ranchview Dr. CA 62639
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} GlocalShipeComers. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
