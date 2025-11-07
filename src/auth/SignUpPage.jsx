import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
// import { createUserWithEmailAndPassword, updateProfile } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"


const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      navigate("/account"); // Redirect to user dashboard after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists. Please login instead.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.");
          break;
        case "auth/operation-not-allowed":
          setError("Email/password accounts are not enabled. Please contact support.");
          break;
        default:
          setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-2">Sign Up</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 font-serif">Join us and start managing your parcels easily.</p>

        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full px-6 py-3 
              bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md 
              text-base font-semibold transition-all shadow-lg shadow-amber-400/20 
              hover:shadow-amber-400/30 sm:px-8 sm:py-3 sm:text-lg cursor-pointer
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-amber-500 hover:to-amber-600"}`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">Already have an account?
            <a href="/login" className="ms-1 text-blue-500 hover:underline font-medium"  onClick={() => navigate("/login")}>Login</a>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
