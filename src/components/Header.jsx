import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-2xl">Lingo Bingo</div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/start-learning" className="text-white">
          Start Learning
        </Link>
        <Link to="/tutorials" className="text-white">
          Tutorials
        </Link>
        <Link to="/about-us" className="text-white">
          About Us
        </Link>
        {user && (
          <Link to="/my-profile" className="text-white">
            My Profile
          </Link>
        )}
      </nav>
      <div>
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <button onClick={logout} className="text-white">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
