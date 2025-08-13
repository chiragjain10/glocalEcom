import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaArrowRight,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 px-6 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4 bg-gray-50 rounded ">
              <img
                src="/images/glocal.png"
                alt="GlocalShipeComers"
                className="h-20 w-auto  max-w-[740px] object-contain drop-shadow-md brightness-0"
              />
            </Link>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Revolutionizing global logistics with cutting-edge technology and unparalleled service to connect markets worldwide.
          </p>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FaPaperPlane className="mr-2 text-amber-500" />
              Subscribe to Newsletter
            </h4>
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:border-amber-500 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all transform hover:-translate-y-0.5  hover:from-yellow-400 hover:to-orange-500 
          hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Subscribe <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="flex gap-4">
            {[
              { icon: FaInstagram, color: 'hover:bg-pink-500' },
              { icon: FaFacebookF, color: 'hover:bg-blue-600' },
              { icon: FaTwitter, color: 'hover:bg-blue-400' },
              { icon: FaLinkedinIn, color: 'hover:bg-blue-700' }
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  href="#"
                  key={i}
                  className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-white transition-all hover:-translate-y-1 shadow-sm hover:shadow-md border border-gray-200 ${social.color} hover:border-transparent`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Product Links - Right side with margin */}
        <div className="ms-2">
          <h4 className="font-semibold text-lg mb-5 text-gray-900 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
            Products
          </h4>
          <ul className="space-y-3">
            {['Pricing', 'Case Studies', 'Features', 'Reviews', 'Updates'].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-lg mb-5 text-gray-900 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
            Company
          </h4>
          <ul className="space-y-3">
            {['About', 'Careers', 'Blog', 'News', 'Contact'].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-amber-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-5 text-gray-900 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
            Contact Us
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 text-amber-500">
                <FaEnvelope />
              </div>
              <div className="min-w-0"> {/* prevent overflow issues */}
                <p className="text-gray-500 text-sm">Email</p>
                <a
                  href="mailto:support@glocalshipe.com"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium m-0 break-all"
                >
                  support@glocalshipe.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="mt-1 text-amber-500">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <a href="tel:+919876543210" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                  +91 9876543210
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-amber-500">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="text-gray-700 font-medium">
                  3891 Ranchview Dr. CA 62639
                </p>
              </div>
            </li>
          </ul>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} GlocalShipeComers. All rights reserved.
          <a href="#" className="ml-4 hover:text-amber-600 transition-colors">Privacy Policy</a>
          <a href="#" className="ml-4 hover:text-amber-600 transition-colors">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;