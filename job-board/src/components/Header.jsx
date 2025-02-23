import React from "react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[60px] z-50 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <h1
          className={`text-xl font-semibold ${
            isDarkMode ? "text-gray-100" : "text-indigo-950"
          }`}
        >
          Job Search
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Board", "Activities", "Contacts", "Documents"].map((item) => (
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
        </nav>

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

          {/* Create Button */}
          <button className="hidden sm:block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            + Create
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
