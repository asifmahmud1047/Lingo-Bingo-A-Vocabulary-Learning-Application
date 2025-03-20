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
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Failed to login with Google!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full py-2 rounded mt-4"
        >
          Login with Google
        </button>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>
        <p className="mt-4 text-sm text-center">
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
