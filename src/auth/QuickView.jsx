import { FaStar, FaHeart, FaShoppingCart, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const QuickViewPage = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation/Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-500 transition-colors"
          >
            <FaArrowLeft className="text-lg" />
            <span>Back to Products</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-amber-500 transition-colors">
              <FaHeart className="text-xl" />
            </button>
            <button className="p-2 text-gray-500 hover:text-amber-500 transition-colors">
              <FaShareAlt className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Product Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6">
            {/* Product Images Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-contain"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3 mt-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="w-20 h-20 bg-gray-100 rounded-md border border-gray-200 cursor-pointer hover:border-amber-400 overflow-hidden"
                  >
                    {/* You would replace this with actual thumbnail images */}
                    <div className="w-full h-full bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">({product.rating} reviews)</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-amber-500">{product.price}</div>

              <p className="text-gray-600 text-lg">{product.description}</p>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <IoIosArrowForward className="text-amber-500 mt-1 flex-shrink-0" />
                    <span>Handcrafted by skilled Indian artisans</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <IoIosArrowForward className="text-amber-500 mt-1 flex-shrink-0" />
                    <span>Made with natural and eco-friendly materials</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <IoIosArrowForward className="text-amber-500 mt-1 flex-shrink-0" />
                    <span>Unique design - each piece is slightly different</span>
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="font-medium text-lg">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-lg">-</button>
                  <span className="px-4 py-2 border-x border-gray-300">1</span>
                  <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-lg">+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-4 rounded-md font-medium hover:from-amber-500 hover:to-amber-600 transition-all shadow-md hover:shadow-lg text-lg">
                  <FaShoppingCart />
                  Add to Cart
                </button>
                <button className="flex-1 bg-white border-2 border-amber-500 text-amber-500 px-6 py-4 rounded-md font-medium hover:bg-amber-50 transition-all text-lg">
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-700 font-medium">Handicrafts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Tags:</span>
                    <span className="text-gray-700 font-medium">Handmade, Artisan, Traditional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="px-6 py-4 font-medium text-amber-500 border-b-2 border-amber-500">
                Description
              </button>
              <button className="px-6 py-4 font-medium text-gray-500 hover:text-amber-500">
                Specifications
              </button>
              <button className="px-6 py-4 font-medium text-gray-500 hover:text-amber-500">
                Reviews ({product.rating})
              </button>
            </nav>
          </div>
          <div className="p-6">
            <p className="text-gray-600">
              {product.description} This beautiful handcrafted item is made using traditional techniques passed down through generations. 
              Each piece is unique with slight variations that add to its charm. Perfect for home decoration or as a special gift.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>© 2023 Handicraft Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuickViewPage;