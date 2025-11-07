import React, { useState, useRef, useEffect } from 'react';
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBars,
  FaSearch,
  FaTimes,
  FaCrown,
  FaGem,
  FaPaintBrush,
  FaBookOpen,
  FaTshirt,
  FaHome,
  FaTags,
  FaHeadphonesAlt,
  FaGopuram
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import './navbar.css';

export const categories = [
  {
    title: 'Audio Video',
    icon: <FaHeadphonesAlt />,
    subItems: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Speakers', 'Microphones']
  },
  {
    title: 'Jewelry',
    icon: <FaGem />,
    subItems: ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Pendants', 'Anklets']
  },
  {
    title: 'Paintings',
    icon: <FaPaintBrush />,
    subItems: ['Abstract', 'Landscape', 'Portrait', 'Still Life', 'Modern', 'Classical']
  },
  {
    title: 'Statues',
    icon: <FaGopuram />,
    subItems: ['Brass', 'Stone', 'Wood', 'Ceramic', 'Metal', 'Resin']
  },
  {
    title: 'Books',
    icon: <FaBookOpen />,
    subItems: ['Fiction', 'Non-Fiction', 'Comics', 'Biographies', 'Self-Help', 'Academic']
  },
  {
    title: 'Clothing & More',
    icon: <FaTshirt />,
    subItems: ['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Bags']
  },
  {
    title: 'Home & Living',
    icon: <FaHome />,
    subItems: ['Furniture', 'Decor', 'Kitchen', 'Bathroom', 'Garden', 'Lighting']
  },
  {
    title: 'Luxe',
    icon: <FaCrown />,
    subItems: ['Premium Items', 'Limited Edition', 'Exclusive', 'VIP Collection']
  },
  {
    title: 'Best Deals',
    icon: <FaTags />,
    subItems: ['Flash Sales', 'Clearance', 'Seasonal Offers', 'Bundle Deals']
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
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;
  const cartCount = Array.isArray(cart) ? cart.reduce((s, i) => s + (i.quantity || 1), 0) : 0;

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
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-text">Shop for daily offers.</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:+919555144777" className="top-bar-link">📞+919555144777</a>
            <a href="mailto:support@glocalship.com" className="top-bar-link">✉️ support@glocalship.com</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hamburger-btn"
              aria-label="Menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hamburger-line"
              />
              <motion.div
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hamburger-line"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hamburger-line"
              />
            </button>
          </div>

          {/* Logo */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="logo-wrapper">
                <img
                  src="/images/glocal.png"
                  alt="GlocalShipeComers"
                  className="logo-image"
                />
                <div className="logo-glow"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-text">Home</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="dropdown-btn"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <span className="dropdown-text">Shop</span>
                  <IoIosArrowDown className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                      className="mega-menu-viewport"
                    >
                      <div className="mega-menu-panel">
                        <div className="mega-menu-header">
                          <span className="mega-menu-heading">Browse Categories</span>
                          <span className="mega-menu-subheading">Handpicked collections</span>
                        </div>
                        <div className="mega-menu-grid">
                          {categories.map((category, index) => (
                            <Link
                              key={index}
                              to={`/all-categories/${category.title.toLowerCase()}`}
                              className="mega-menu-link"
                              onClick={() => setIsOpen(false)}
                            >
                              <motion.div
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="mega-menu-card"
                              >
                                <div className="mega-menu-icon">
                                  <span className="mega-menu-icon-svg">{category.icon}</span>
                                </div>
                                <div className="mega-menu-content">
                                  <span className="mega-menu-title">{category.title}</span>
                                  <span className="mega-menu-subtitle">Explore {category.title}</span>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                        <div className="mega-menu-footer">
                          <Link
                            to="/all-categories"
                            className="dropdown-footer-link"
                            onClick={() => setIsOpen(false)}
                          >
                            View all categories
                            <IoIosArrowForward />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-text">About</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-text">Contact</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Search and Icons */}
          <div className="header-actions">
            {/* Mobile Search Button */}
            <button
              className="mobile-search-btn"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <FaSearch className="search-icon" />
            </button>

            {/* Desktop Search */}
            <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
              <form
                className="search-form"
                onSubmit={handleSearchSubmit}
              >
                <button
                  type="button"
                  className="search-toggle-btn"
                  onClick={toggleSearch}
                  aria-label="Search"
                >
                  <FaSearch className="search-icon" />
                </button>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search luxury items..."
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="search-submit-btn"
                  aria-label="Submit search"
                >
                  <FaSearch className="search-icon" />
                </button>
              </form>
            </div>

            {/* Desktop Icons */}
            <div className="action-icons">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `action-icon ${isActive ? 'active' : ''}`
                }
              >
                <div className="icon-wrapper">
                  <FaHeart className="action-icon-svg" />
                  {wishlistCount > 0 && (
                    <span className="notification-badge wishlist-badge">{wishlistCount}</span>
                  )}
                </div>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `action-icon ${isActive ? 'active' : ''}`
                }
              >
                <div className="icon-wrapper">
                  <FaShoppingCart className="action-icon-svg" />
                  {cart && cart.reduce((s, i) => s + (i.quantity || 1), 0) > 0 && (
                    <span className="notification-badge cart-badge">
                      {cart.reduce((s, i) => s + (i.quantity || 1), 0)}
                    </span>
                  )}
                </div>
              </NavLink>

              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `action-icon ${isActive ? 'active' : ''}`
                }
              >
                <div className="icon-wrapper">
                  <FaUser className="action-icon-svg" />
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-search-expanded"
            >
              <form
                className="mobile-search-form"
                onSubmit={handleSearchSubmit}
              >
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search luxury items..."
                  className="mobile-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="mobile-search-submit"
                >
                  <FaSearch className="search-icon" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mobile-menu"
            ref={mobileMenuRef}
          >
            <div className="mobile-menu-header">
              <Link to="/" className="mobile-logo">
                <span className="mobile-logo-text">Glocalship</span>
                <span className="mobile-logo-accent">Ecommerce</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-close-btn"
              >
                <FaTimes className="close-icon" />
              </button>
            </div>

            <div className="mobile-menu-content">
              <ul className="mobile-nav-list">
                <li className="mobile-nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="mobile-nav-item">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </NavLink>
                </li>

                <li className="mobile-nav-item">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>

                <li className="mobile-nav-item">
                  <div className="mobile-categories-header">
                    <span>Categories</span>
                  </div>
                  {categories.map((category, index) => (
                    <NavLink
                      key={index}
                      to={`/all-categories/${category.title.toLowerCase()}`}
                      className={({ isActive }) =>
                        `mobile-category-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-category-icon">{category.icon}</span>
                      {category.title}
                    </NavLink>
                  ))}
                </li>

                <li className="mobile-nav-item">
                  <div className="mobile-actions">
                    <NavLink
                      to="/wishlist"
                      className={({ isActive }) =>
                        `mobile-action-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaHeart className="mobile-action-icon" />
                      Wishlist
                      {wishlistCount > 0 && (
                        <span className="mobile-count-pill wishlist-pill">{wishlistCount}</span>
                      )}
                    </NavLink>

                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        `mobile-action-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaShoppingCart className="mobile-action-icon" />
                      Cart
                      {cart && cart.reduce((s, i) => s + (i.quantity || 1), 0) > 0 && (
                        <span className="mobile-count-pill cart-pill">{cart.reduce((s, i) => s + (i.quantity || 1), 0)}</span>
                      )}
                    </NavLink>

                    <NavLink
                      to="/account"
                      className={({ isActive }) =>
                        `mobile-action-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser className="mobile-action-icon" />
                      Account
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Bottom Mobile Nav */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className={({ isActive }) => `bottom-item ${isActive ? 'active' : ''}`}>
          <FaHome className="bottom-icon" />
          <span className="bottom-label">Home</span>
        </NavLink>
        <NavLink to="/all-categories" className={({ isActive }) => `bottom-item ${isActive ? 'active' : ''}`}>
          <FaTags className="bottom-icon" />
          <span className="bottom-label">Categories</span>
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `bottom-item ${isActive ? 'active' : ''}`}>
          <span className="bottom-icon-wrapper">
            <FaHeart className="bottom-icon" />
            {wishlistCount > 0 && <span className="bottom-badge wishlist">{wishlistCount}</span>}
          </span>
          <span className="bottom-label">Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => `bottom-item ${isActive ? 'active' : ''}`}>
          <span className="bottom-icon-wrapper">
            <FaShoppingCart className="bottom-icon" />
            {cartCount > 0 && <span className="bottom-badge cart">{cartCount}</span>}
          </span>
          <span className="bottom-label">Cart</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;