import React from "react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm p-4 flex justify-between items-center transition-colors duration-300`}
    >
      <h1
        className={`text-xl font-semibold ${
          isDarkMode ? "text-gray-100" : "text-indigo-950"
        }`}
      >
        Job Search
      </h1>
      <div className="flex items-center space-x-3">
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
        <div className="relative">
          <input
            type="text"
            placeholder="Filter"
            className="pl-8 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
          Board
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
          Activities
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
          Contacts
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
          Documents
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
          + Create
        </button>
      </div>
    </header>
  );
};

export default Header;
