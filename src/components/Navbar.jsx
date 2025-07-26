import { useState } from 'react';
import { FaShoppingCart, FaSearch, FaHeart, FaBox } from 'react-icons/fa';


const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Clothing", "Electronics", "Home", "Books"];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">GlocalBazaar</div>

        <div className="search-bar">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            className="search-input"
            placeholder="Search our 400,000+ beautiful handpicked products"
          />
          <button className="search-btn"><FaSearch /></button>
        </div>

        <div className="header-icons">
          <a href="/wishlist" className="icon-label"><FaHeart /> <span>Wishlist</span></a>
          <a href="/orders" className="icon-label"><FaBox /> <span>My Orders</span></a>
          <a href="/cart" className="icon-label"><FaShoppingCart /> <span>Cart</span></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
