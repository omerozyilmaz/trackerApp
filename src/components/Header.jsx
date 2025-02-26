import React from "react";
import { Link } from "react-router-dom";
import useHeader from "../hooks/useHeader";

const Header = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    isAuthenticated,
    user,
    logout,
    handleNavigate,
    handleBoardClick,
    handleContactClick,
  } = useHeader();

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[60px] z-50 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo and Main Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/">
            <h1
              className={`text-xl font-semibold ${
                isDarkMode ? "text-gray-100" : "text-indigo-950"
              }`}
            >
              Job Search
            </h1>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Contact link always visible */}
            <button
              onClick={handleContactClick}
              className={`px-3 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Contact
            </button>

            {isAuthenticated && (
              <>
                <button
                  onClick={handleBoardClick}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Board
                </button>
                {["Activities", "Documents"].map((item) => (
                  <button
                    key={item}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:text-purple-400"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </>
            )}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>

          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-2">
                <span
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {user?.username}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className={`px-3 py-1 rounded-md ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Logout
              </button>

              {/* Create Button */}
              <button className="hidden sm:block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                + Create
              </button>
            </>
          ) : (
            <>
              {/* Login/Register Buttons */}
              <button
                onClick={() => handleNavigate("/login")}
                className={`px-3 py-1 rounded-md ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("/register")}
                className="hidden sm:block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
