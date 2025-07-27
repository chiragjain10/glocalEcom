// import { useState } from 'react';
// import { FaShoppingCart, FaSearch,  FaBox } from 'react-icons/fa';


// const Header = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const categories = ["All", "Clothing", "Electronics", "Home", "Books"];

//   return (
//     <header className="header">
//       <div className="header-container">
//         <div className="logo">GlocalBazaar</div>

//         <div className="search-bar">
//           <select
//             className="category-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>

//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search our 400,000+ beautiful handpicked products"
//           />
//           <button className="search-btn"><FaSearch /></button>
//         </div>

//         <div className="header-icons">
//           
//           <a href="/orders" className="icon-label"><FaBox /> <span>My Orders</span></a>
//           <a href="/cart" className="icon-label"><FaShoppingCart /> <span>Cart</span></a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { FaShoppingBag, FaUser, FaHeart, FaBars } from 'react-icons/fa';
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
            <div className="hidden group-hover:flex absolute left-0 mt-6 bg-white/90 text-black shadow-lg rounded-xl px-6 py-3 gap-4 overflow-x-auto border border-gray-300 whitespace-nowrap text-sm font-medium backdrop-blur-md w-fit max-w-[90vw] z-50 no-scrollbar">

              {categories.map((cat, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-green-600 whitespace-nowrap"
                >
                  {cat.title}
                </a>
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
          <FaShoppingBag className="hover:text-green-300 transition cursor-pointer" />
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
      {isMobileMenuOpen && (
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
      )}
    </header>
  );
};

export default Navbar;
