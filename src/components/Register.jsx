import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="photoURL" className="block mb-2">
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span className="text-blue-500">
            <a href="/login">Login</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
