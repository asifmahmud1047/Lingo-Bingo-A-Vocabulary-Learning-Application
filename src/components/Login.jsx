import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Get the intended destination from location state, or default to home
  const from = location.state?.from?.pathname || "/";

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password!");
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    console.log(auth,googleProvider);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Failed to login with Google!");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3 sm:mb-4">
            <label htmlFor="email" className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border rounded text-sm sm:text-base"
              required
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label htmlFor="password" className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border rounded text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-1.5 sm:py-2 rounded text-sm sm:text-base"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full py-1.5 sm:py-2 rounded mt-3 sm:mt-4 text-sm sm:text-base"
        >
          Login with Google
        </button>
        <div className="mt-3 sm:mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 text-sm sm:text-base">
            Forgot Password?
          </Link>
        </div>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
