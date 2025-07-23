import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/appContext.js";

const API_BASE = "http://localhost:3000"; // Local backend

function SignIn() {
  const navigate = useNavigate();

  const {
    isSignUp,
    setIsSignUp,
    isLogin,
    setIsLogin,
  } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear form fields
  const clearForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setAvatar("");
  };

  // Toggle between Signup/Login
  const toggleForm = () => {
    setIsSignUp((prev) => !prev); // ✅ Use function form
    clearForm();
  };

  // Registration handler
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/registeration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, avatar }),
      });

      if (!res.ok) throw new Error("Registration failed");

      await res.json();
      setIsSignUp(true);
      alert("Registered successfully! Please log in.");
      clearForm();
    } catch (err) {
      console.error("Registration error:", err.message);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);

      setIsLogin(true);
      alert("Logged in successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.message);
      alert("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
      onSubmit={isSignUp ? handleLogin : handleRegistration}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isSignUp ? "Log In" : "Sign Up"}
      </h2>

      {/* Username */}
      {!isSignUp && (
        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            type="text"
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      )}

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          id="password"
          type="password"
          className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Avatar (Sign Up Only) */}
      {!isSignUp && (
        <div className="mb-5">
          <label htmlFor="avatar" className="block text-gray-700 font-medium mb-2">
            Avatar URL (optional)
          </label>
          <input
            id="avatar"
            type="text"
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your avatar image URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
      )}

      {/* Avatar Preview */}
      {avatar && !isSignUp && (
        <div className="mb-5 text-center">
          <img
            src={avatar}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full mx-auto border border-gray-300 object-cover"
          />
          <p className="text-sm text-gray-600 mt-2">Avatar Preview</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="mb-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {loading ? "Please wait..." : isSignUp ? "Log In" : "Sign Up"}
        </button>
      </div>

      {/* Toggle Form */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-500 hover:underline"
        >
          {isSignUp
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </button>
      </div>
    </form>
  );
}

export default SignIn;
