import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const countries = [
  { name: "India", code: "+91", emoji: "🇮🇳" },
  { name: "United States", code: "+1", emoji: "🇺🇸" },
  { name: "United Kingdom", code: "+44", emoji: "🇬🇧" },
  { name: "Canada", code: "+1", emoji: "🇨🇦" },
  { name: "Germany", code: "+49", emoji: "🇩🇪" },
];

const Checkout = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Handmade Pot",
      image: "https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg",
      price: 899,
    },
    {
      id: 2,
      name: "Tribal Mask",
      image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/mask-1959324_1280.jpg",
      price: 1299,
    },
  ]);

  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 md:flex gap-8" style={{marginTop:'50px'}}>
      {/* LEFT: FORM */}
      <div className="md:w-2/3 bg-white rounded-lg shadow p-6 border border-amber-400/50">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                className="w-32 px-3 py-2 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
                value={selectedCountry.code}
                onChange={(e) =>
                  setSelectedCountry(
                    countries.find((c) => c.code === e.target.value)
                  )
                }
              >
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.emoji} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full px-4 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address Inputs */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter city"
              className="px-4 py-2 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
              required
            />
            <input
              type="text"
              placeholder="Enter state"
              className="px-4 py-2 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
              required
            />
            <input
              type="text"
              placeholder="Enter ZIP code"
              className="px-4 py-2 rounded-md text-sm border border-amber-400/50 bg-white/70 backdrop-blur-sm"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mt-2">
            <input type="checkbox" className="mt-1" required />
            <p className="text-sm">
              I have read and agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </form>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="md:w-1/3 mt-8 md:mt-0 rounded-lg shadow p-6 border border-amber-400/50">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in your cart.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600 text-sm">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove Item"
                  >
                    <FaTimes size={18} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <button
              onClick={() => navigate("/payment")}
              className="w-full mt-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-sm rounded-md hover:bg-[#6c3d25] cursor-pointer"
              disabled={cartItems.length === 0}
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
