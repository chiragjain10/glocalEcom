
import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaHeart, FaBars } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { categories } from '../HomePagemain/MenuNavigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  console.log(searchQuery);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-transparent text-white font-inter">

        {/* Left links for desktop */}
        <ul className="hidden md:flex items-center gap-8 text-base font-medium">
          <li><a href="#" className="hover:text-green-300 transition">About</a></li>
          <li><a href="#" className="hover:text-green-300 transition">Contact</a></li>

          {/* Hover dropdown for categories */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-base hover:text-green-300">
              Categories <IoIosArrowDown />
            </button>
            {/* Dropdown menu */}
            <div className="absolute left-0 mt-3 bg-white/90 text-black shadow-lg rounded-xl px-6 py-4 border border-gray-300 text-sm font-medium backdrop-blur-md w-45 z-50 no-scrollbar
            opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
          transition-all duration-500 ease-in-out
          flex flex-col gap-2">

              {categories.map((cat, index) => (
                <div key={index} className="relative group/item">
                  <a
                    href="#"
                    className="hover:text-green-600 transition-colors duration-300 flex items-center gap-1"
                  >
                    {cat.title}
                    {cat.subItems && <IoIosArrowDown className="text-xs mt-1" />}
                  </a>

                  {cat.subItems && (
                    <div className="absolute left-full top-0 mt-0 bg-white/90 text-black shadow-lg rounded-xl px-4 py-3 border border-gray-200 w-48 opacity-0 group-hover/item:opacity-100 invisible group-hover/item:visible transition-all duration-300 z-50 space-y-1">
                      {cat.subItems.map((sub, subIndex) => (
                        <div key={subIndex} className="group/subitem relative">
                          <a href="#" className="text-sm hover:text-green-600 flex justify-between items-center">
                            {sub.title || sub}
                            {sub.subSubItems && <IoIosArrowDown className="text-[10px]" />}
                          </a>

                          {/* 3rd level dropdown (subSubItems) */}
                          {sub.subSubItems && (
                            <div className="absolute left-full top-0 bg-white text-black border border-gray-200 shadow-md rounded-md w-48 py-2 px-3 opacity-0 group-hover/subitem:opacity-100 invisible group-hover/subitem:visible transition-all duration-300 z-50 space-y-1">
                              {sub.subSubItems.map((item, idx) => (
                                <a key={idx} href="#" className="text-sm hover:text-green-600 block">
                                  {item}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
            </div>
        </ul>

        {/* Center logo */}
        <h1 className="text-3xl font-playfair italic tracking-wide">
          Glocalshipe<span className="text-green-400">Ecommerc</span>
        </h1>

        {/* Right icons + search */}
        <div className="flex items-center gap-5 text-xl">
          {/* Search box for desktop */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search Product..."
              className="px-4 py-1 rounded-full bg-white/80 text-black text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 w-64 h-8"
              type='text'
              onChange={handleSearchChange}
              value={searchQuery}
            />
          </div>
          <a href="/wishlist" className="hover:text-green-300 transition"><FaHeart /></a>
          <FaShoppingCart className="hover:text-green-300 transition cursor-pointer" />
          <FaUser className="hover:text-green-300 transition cursor-pointer" />

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {
        isMobileMenuOpen && (
          <div className="bg-white text-black px-6 py-4 space-y-3 md:hidden transition-all duration-300 ease-in-out rounded-b-xl shadow-md">
            <a href="#" className="block text-base font-medium hover:text-green-600">About</a>
            <a href="#" className="block text-base font-medium hover:text-green-600">Contact</a>
            <div>
              <h2 className="font-semibold mb-2">Categories</h2>
              <div className="flex flex-wrap gap-3 text-sm">
                {categories.map((cat, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-green-600"
                  >
                    {cat.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </header >
  );
};

export default Navbar;
