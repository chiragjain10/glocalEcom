import { FaFire, FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const trendingProducts = [
  {
    id: 1,
    name: "Handmade Pot",
    price: "₹899",
    image: "https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg",
  },
  {
    id: 2,
    name: "Tribal Mask",
    price: "₹1299",
    image: "https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg",
  },
  {
    id: 3,
    name: "Bamboo Basket",
    price: "₹499",
    image: "https://m.media-amazon.com/images/I/71a+1jseHVL.jpg",
  },
  {
    id: 4,
    name: "Wooden Elephant",
    price: "₹799",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXb2_K3vluQzr5AkNu263uZRnNrom71NtMg&s",
  },
];

const newArrivals = [
  {
    id: 5,
    name: "Terracotta Lamp",
    price: "₹699",
    image: "https://i.etsystatic.com/39352855/r/il/afb0e0/6285520242/il_fullxfull.6285520242_fhcp.jpg",
  },
  {
    id: 6,
    name: "Warli Painting",
    price: "₹999",
    image: "https://cdn.pixabay.com/photo/2015/09/26/04/20/warli-958606_1280.jpg",
  },
  {
    id: 7,
    name: "Jute Coasters",
    price: "₹299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhhE9H3tE6nATKe7dJIeBZYmvXGseU1Mr9g&s",
  },
  {
    id: 8,
    name: "Block Print Fabric",
    price: "₹899",
    image: "https://thefeelgoodstudio.in/cdn/shop/products/IMG_0239.jpg?v=1570121531&width=1920",
  },
];

const ProductCard = ({ item, badge }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border border-gray-100 hover:border-amber-200">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div
          className={`px-3 py-1 text-xs font-medium rounded-full shadow-md ${
            badge === "Trending"
              ? "bg-gradient-to-r from-red-500 to-amber-500 text-white"
              : "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
          }`}
        >
          {badge}
        </div>
      </div>

      {/* Hover Icons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-white rounded-full shadow hover:bg-amber-100">
          <FaHeart className="text-rose-500 w-4 h-4" />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-amber-100">
          <FaShoppingCart className="text-amber-600 w-4 h-4" />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-amber-100">
          <FaEye className="text-gray-700 w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">Handcrafted by Indian artisans</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-extrabold text-amber-500">{item.price}</p>
          <div className="flex items-center text-amber-400">
            <FaStar className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-600">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HighlightsSection = () => {
  return (
    <section className="bg-[#f4f2e9] py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 🔥 Trending Products */}
        <div>
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-red-500 to-amber-500 rounded-xl shadow-lg">
                <FaFire className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
            </div>
            <p className="text-gray-500">Most loved by our customers</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingProducts.map((item) => (
              <ProductCard key={item.id} item={item} badge="Trending" />
            ))}
          </div>
        </div>

        {/* 🆕 New Arrivals */}
        <div>
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-lg">
                <FaStar className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            </div>
            <p className="text-gray-500">Fresh additions to our collection</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newArrivals.map((item) => (
              <ProductCard key={item.id} item={item} badge="New" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
