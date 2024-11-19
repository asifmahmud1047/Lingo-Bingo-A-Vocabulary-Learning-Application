import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleReset}>
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
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
