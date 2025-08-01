import React, { useState, useRef, useEffect } from 'react';
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBars,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.15
      }
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <header className={`fixed top-6 left-0 w-full z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-md py-1' : 'bg-white/90 backdrop-blur-sm py-3'}`}>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-xl text-gray-600" />
            ) : (
              <FaBars className="text-xl text-gray-600" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="text-2xl lg:text-3xl font-playfair italic font-bold tracking-tight bg-gradient-to-r from-gray-800 to-amber-500 bg-clip-text text-transparent">
            Glocalship<span className="text-amber-500">Ecommerce</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-8">
          {/* Left links */}
          <div className="flex items-center space-x-6 xl:space-x-8">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative ${isActive ? 'text-amber-500' : 'text-gray-700'} font-medium transition-colors duration-200 group`
              }
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-200 group-hover:w-full"></span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative ${isActive ? 'text-amber-500' : 'text-gray-700'} font-medium transition-colors duration-200 group`
              }
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-200 group-hover:w-full"></span>
            </NavLink>

            {/* Categories Dropdown */}
            <div className=" px-6 py-4 relative z-50">
              <ul className="flex items-center gap-6 text-gray-800 font-medium">
                <li
                  className="relative group"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <button className="flex items-center hover:text-amber-500 transition-colors duration-200">
                    Categories
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-top">
                      <ul className="py-1">
                        <li>
                          <Link
                            to="/all-categories/:mainCategory"
                            className="flex items-center px-4 py-3 hover:bg-amber-50 transition-colors duration-200 group"
                          >
                            <span className="w-6 h-6 mr-3 text-amber-500 group-hover:text-amber-600">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 011.414 1.414" />
                              </svg>
                            </span>
                            <span className="group-hover:text-amber-600">Audio</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/all-categories/:mainCategory"
                            className="flex items-center px-4 py-3 hover:bg-amber-50 transition-colors duration-200 group"
                          >
                            <span className="w-6 h-6 mr-3 text-amber-500 group-hover:text-amber-600">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </span>
                            <span className="group-hover:text-amber-600">Video</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/all-categories/:mainCategory"
                            className="flex items-center px-4 py-3 hover:bg-amber-50 transition-colors duration-200 group"
                          >
                            <span className="w-6 h-6 mr-3 text-amber-500 group-hover:text-amber-600">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </span>
                            <span className="group-hover:text-amber-600">Books</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/all-categories/:mainCategory"
                            className="flex items-center px-4 py-3 hover:bg-amber-50 transition-colors duration-200 group"
                          >
                            <span className="w-6 h-6 mr-3 text-amber-500 group-hover:text-amber-600">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </span>
                            <span className="group-hover:text-amber-600">Games</span>
                          </Link>
                        </li>
                      </ul>
                      <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
                        <Link
                          to="/all-categories"
                          className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
                        >
                          View all categories
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
          </div>
        </div>
      </div>



      {/* Right Icons */}
      <div className="flex items-center space-x-4 sm:space-x-5">
        {/* Search Icon - Mobile */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-amber-500 transition-colors duration-200"
          onClick={toggleSearch}
          aria-label="Search"
        >
          {isSearchExpanded ? <FaTimes /> : <FaSearch />}
        </button>

        {/* Search Bar - Desktop */}
        <form
          className={`hidden lg:flex items-center overflow-hidden ${isSearchExpanded ? 'w-64' : 'w-10'} bg-gray-100/80 hover:bg-gray-200/60 rounded-full transition-all duration-200`}
          onSubmit={handleSearchSubmit}
        >
          <button
            type="button"
            className="p-2 text-gray-800 hover:text-amber-500 transition-colors duration-200"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <FaSearch />
          </button>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search luxury items..."
            className={`bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-600 transition-all duration-200 ${isSearchExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `p-2 ${isActive ? 'text-amber-500' : 'text-gray-700'} hover:text-amber-500 transition-colors duration-200`
            }
          >
            <FaHeart className="text-lg" />
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `p-2 ${isActive ? 'text-amber-500' : 'text-gray-600'} hover:text-amber-500 transition-colors duration-200`
            }
          >
            <FaShoppingCart className="text-lg" />
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              `p-2 ${isActive ? 'text-amber-500 border-amber-400' : 'text-gray-600 border-gray-300'} hover:text-amber-500 transition-colors duration-200 rounded-full border hover:border-amber-400`
            }
          >
            <FaUser className="text-lg" />
          </NavLink>
        </div>
      </div>
    </nav>

      {/* Mobile Search */ }
  <AnimatePresence>
    {isSearchExpanded && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.15 }}
        className="lg:hidden px-4 bg-white"
      >
        <form className="relative py-3" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search premium products..."
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm"
            value={searchQuery}
            onChange={handleSearchChange}
            ref={searchRef}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Mobile Menu */ }
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div
        ref={mobileMenuRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        className="lg:hidden bg-white shadow-lg rounded-b-lg overflow-hidden"
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'} transition-colors duration-200`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'} transition-colors duration-200`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>

          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Shop Categories
            </h3>
            <div className="mt-1 space-y-1">
              {categories.map((cat, index) => (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleDropdown(`mobile-cat-${index}`)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors duration-200"
                  >
                    <span>{cat.title}</span>
                    {cat.subItems && (
                      <IoIosArrowForward className={`text-xs transition-transform ${activeDropdown === `mobile-cat-${index}` ? 'rotate-90' : ''}`} />
                    )}
                  </button>

                  {activeDropdown === `mobile-cat-${index}` && cat.subItems && (
                    <div className="pl-4 space-y-1">
                      {cat.subItems.map((sub, subIndex) => (
                        <div key={subIndex}>
                          <Link
                            to={`/category/${cat.title.toLowerCase()}/${sub.title ? sub.title.toLowerCase() : sub.toLowerCase()}`}
                            className="flex items-center justify-between w-full px-4 py-2 text-xs text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors duration-200"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            <span>{sub.title || sub}</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-around">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-amber-500' : 'text-gray-700'} hover:text-amber-500 transition-colors duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHeart className="text-lg" />
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-amber-500' : 'text-gray-600'} hover:text-amber-500 transition-colors duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaShoppingCart className="text-lg" />
              </NavLink>

              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-amber-500 border-amber-400' : 'text-gray-600 border-gray-300'} hover:text-amber-500 transition-colors duration-200 rounded-full border hover:border-amber-400`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUser className="text-lg" />
              </NavLink>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
    </header >
  );
};

export default Navbar;