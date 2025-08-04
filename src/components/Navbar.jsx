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

const categories = [
  {
    title: 'Audio-video',
    subItems: ['Smartphones', 'Laptops', 'Headphones', 'Cameras']
  },
  {
    title: 'jewelry',
    subItems: ['Men', 'Women', 'Kids', 'Accessories']
  },
  {
    title: 'Paintings',
    subItems: ['Abstract', 'Landscape', 'Portrait', 'Still Life']
  },
  {
    title: 'Books',
    subItems: ['Fiction', 'Non-Fiction', 'Comics', 'Biographies']
  }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-md py-2' : 'bg-white/90 backdrop-blur-sm py-3'}`}>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-xl text-gray-600" /> : <FaBars className="text-xl text-gray-600" />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="text-2xl lg:text-3xl font-playfair italic font-bold tracking-tight bg-gradient-to-r from-gray-800 to-amber-500 bg-clip-text text-transparent">
            Glocalship<span className="text-amber-500">Ecommerce</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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

          <div className="relative">
            <button
              className="flex items-center hover:text-amber-500 transition-colors duration-200 font-medium"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              Categories
              <IoIosArrowDown className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <ul className="py-1">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`/all-categories/${category.title.toLowerCase()}`}
                          className="flex items-center px-4 py-3 hover:bg-amber-50 transition-colors duration-200 group"
                        >
                          <span className="group-hover:text-amber-600">{category.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
                    <Link
                      to="/all-categories"
                      className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
                    >
                      View all categories
                      <IoIosArrowForward className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4 gap-2">
          {/* Mobile Search Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-amber-500 transition-colors duration-200"
            onClick={toggleSearch}
            aria-label="Search"
          >
            {isSearchExpanded ? <FaTimes /> : <FaSearch />}
          </button>

          {/* Desktop Search */}
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
              className={`bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-600 transition-all duration-200 ${isSearchExpanded ? 'w-full opacity-100 px-2' : 'w-0 opacity-0'}`}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-3 sm:space-x-4">
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

        {/* Mobile Search Expanded */}
        {isSearchExpanded && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden">
            <form
              className="flex items-center p-3"
              onSubmit={handleSearchSubmit}
            >
              <input
                ref={searchRef}
                type="text"
                placeholder="Search luxury items..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="bg-amber-500 text-white px-4 py-2 ms-3 rounded-r-lg hover:bg-amber-600 transition-colors duration-200"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-screen w-64 bg-white shadow-xl z-50 lg:hidden"
            ref={mobileMenuRef}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <Link to="/" className="text-xl font-playfair italic font-bold tracking-tight bg-gradient-to-r from-gray-800 to-amber-500 bg-clip-text text-transparent">
                Glocalship<span className="text-amber-500">Ecommerce</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 ms-2 mt-2 text-gray-600 hover:text-amber-500"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <div className="p-4 h-[calc(100%-60px)] overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <div className="border-t border-gray-200 my-2"></div>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/all-categories/${category.title.toLowerCase()}`}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-100'}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.title}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <div className="border-t border-gray-200 my-2"></div>
                </li>
                {/* Mobile Menu Icons */}
                <li>
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaHeart className="mr-3" /> Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaShoppingCart className="mr-3" /> Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg ${isActive ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUser className="mr-3" /> Account
                  </NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;