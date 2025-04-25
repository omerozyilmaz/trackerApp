import React from "react";
import { useTheme } from "../../context/ThemeContext";

const LoadingSpinner = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="relative">
        <div
          className={`w-12 h-12 rounded-full border-4 border-t-transparent border-b-transparent animate-spin ${
            isDarkMode ? "border-gray-300" : "border-gray-700"
          }`}
        ></div>
        <div
          className={`mt-4 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
