import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/appContext.js";
function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { isSignUp, setIsSignUp, isLogin, setIsLogin } = useContext(AppContext);

  // Registration handler
  async function handleRegistration(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/registeration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          avatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      await response.json();
      setIsSignUp(true);
      clearForm();
      alert("Registered successfully! Please log in.");
    } catch (error) {
      console.error("Registration error:", error.message);
      alert("Registration failed. Please try again.");
    }
  }

  // Login handler
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      alert("Logged in successfully!");
      navigate("/home");
      setIsLogin(!isLogin);
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  }

  // Clear form fields
  const clearForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setAvatar("");
  };

  // Toggle between login and signup
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    clearForm();
  };

  return (
    <>
      <form
        className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
        onSubmit={isSignUp ? handleLogin : handleRegistration}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isSignUp ? "Log In" : "Sign Up"}
        </h2>

        {!isSignUp && (
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Avatar */}
        {!isSignUp && (
          <div className="mb-5">
            <label
              htmlFor="avatar"
              className="block text-gray-700 font-medium mb-2"
            >
              Avatar URL (optional)
            </label>
            <input
              id="avatar"
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Paste your avatar image URL"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
          </div>
        )}

        {/* Avatar Preview */}
        {avatar && (
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
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </div>

        {/* Toggle between Sign Up and Log In */}
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
    </>
  );
}

export default SignIn;
