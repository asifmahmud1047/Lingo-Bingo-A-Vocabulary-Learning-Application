import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-4">Contact us: support@lingobingo.com</p>
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-white"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-white"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-white"
          >
            Instagram
          </a>
        </div>
        <p className="text-sm">&copy; 2024 Lingo Bingo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
