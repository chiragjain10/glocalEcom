import { FaHeart, FaShoppingCart, FaArrowRight, FaEye } from 'react-icons/fa';

const products = [
  {
    id: 1,
    title: 'Handmade Musician',
    type: 'Tribal Art',
    image: 'https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg',
    price: '₹1,299',
  },
  {
    id: 2,
    title: 'Copper Craft Bowl',
    type: 'Copper Craft',
    image: 'https://cdn.pixabay.com/photo/2024/12/23/07/48/heavenly-bamboo-9286035_1280.jpg',
    price: '₹899',
  },
  {
    id: 3,
    title: 'Wooden Peacock Carving',
    type: 'Wood Carving',
    image: 'https://cdn.pixabay.com/photo/2013/01/05/21/02/art-74050_1280.jpg',
    price: '₹2,150',
  },
  {
    id: 4,
    title: 'Red Lacquer Toys',
    type: 'Channapatna Wood',
    image: 'https://cdn.pixabay.com/photo/2017/07/26/22/35/wooden-mask-2543403_1280.jpg',
    price: '₹749',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section bg-gray-50 ">
      <h2 className="featured-heading">Best Sellers</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="hover-actions">
                <button className="hover-btn">
                  <FaShoppingCart />
                </button>
                <button className="hover-btn">
                  <FaHeart />
                </button>
                <button className="hover-btn">
                  <FaEye />
                </button>
              </div>
            </div>
            <div className="product-info">
              <p className="product-type">{product.type}</p>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
        <div className="flex justify-center mt-10">
      <button className="relative overflow-hidden px-6 py-3 rounded-md flex items-center gap-2 font-semibold text-black 
        bg-gradient-to-r from-amber-400 to-amber-500 
        transition-all duration-500 ease-in-out 
        hover:from-yellow-400 hover:to-orange-500 
        hover:shadow-xl group">
        
        <span className="relative z-10">View All</span>

        <FaArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />

        {/* Optional Glow Layer */}
        <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg rounded-md"></span>
      </button>
    </div>
    </section>
  );
};

export default FeaturedProducts;
