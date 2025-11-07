import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const LogInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
              await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate("/"); // Redirect to user dashboard after successful login
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Failed to login. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Login</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <h3 className="text-xl text-gray-600 font-serif">
            Access your GlocalshipEcommerce Account
          </h3>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full px-6 py-3 
              bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md 
              text-base font-semibold transition-all shadow-lg shadow-amber-400/20 
              ${loading 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:from-amber-500 hover:to-amber-600 hover:shadow-amber-400/30"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="text-amber-500 hover:underline font-medium" 
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogInPage;