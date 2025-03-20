import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      password.length < 6
    ) {
      setError(
        "Password must include uppercase, lowercase, and be at least 6 characters long."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3 sm:mb-4">
            <label htmlFor="name" className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border rounded text-sm sm:text-base"
              required
            />
          </div>
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
          <div className="mb-4 sm:mb-5">
            <label htmlFor="photoURL" className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border rounded text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-1.5 sm:py-2 rounded text-sm sm:text-base"
          >
            Register
          </button>
        </form>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
