import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error("Failed to send password reset email!");
      console.error("Password reset error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
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
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-1.5 sm:py-2 rounded mb-3 sm:mb-4 text-sm sm:text-base"
          >
            Send Reset Email
          </button>
        </form>
        <div className="text-center">
          <Link to="/login" className="text-blue-500 text-xs sm:text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
