import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center relative">
      <div className="text-white font-bold text-2xl">Lingo Bingo</div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white focus:outline-none" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      
      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-4">
        <Link to="/" className="text-white hover:text-blue-200">
          Home
        </Link>
        <Link to="/start-learning" className="text-white hover:text-blue-200">
          Start Learning
        </Link>
        <Link to="/tutorials" className="text-white hover:text-blue-200">
          Tutorials
        </Link>
        <Link to="/about-us" className="text-white hover:text-blue-200">
          About Us
        </Link>
        {user && (
          <Link to="/my-profile" className="text-white hover:text-blue-200">
            My Profile
          </Link>
        )}
      </nav>
      
      <div className="hidden md:block">
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              src={user.photoURL || "https://via.placeholder.com/32"}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <button onClick={logout} className="text-white hover:text-blue-200">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-blue-200">
            Login
          </Link>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-500 shadow-md py-4 px-4 md:hidden z-50">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-white hover:text-blue-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/start-learning" className="text-white hover:text-blue-200" onClick={toggleMenu}>
              Start Learning
            </Link>
            <Link to="/tutorials" className="text-white hover:text-blue-200" onClick={toggleMenu}>
              Tutorials
            </Link>
            <Link to="/about-us" className="text-white hover:text-blue-200" onClick={toggleMenu}>
              About Us
            </Link>
            {user && (
              <Link to="/my-profile" className="text-white hover:text-blue-200" onClick={toggleMenu}>
                My Profile
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-2 pt-2 border-t border-blue-400">
                <img
                  src={user.photoURL || "https://via.placeholder.com/32"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <button onClick={() => {logout(); toggleMenu();}} className="text-white hover:text-blue-200">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-200 pt-2 border-t border-blue-400" onClick={toggleMenu}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
