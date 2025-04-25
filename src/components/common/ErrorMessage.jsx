import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ErrorMessage = ({ message }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div
        className={`
          max-w-md w-full p-4 rounded-lg shadow-lg
          ${
            isDarkMode
              ? "bg-red-900/20 border border-red-700/50 text-red-200"
              : "bg-red-50 border border-red-200 text-red-700"
          }
        `}
      >
        <div className="flex items-center">
          <svg
            className={`w-6 h-6 mr-2 ${
              isDarkMode ? "text-red-400" : "text-red-500"
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p className="mt-2 text-sm">
          {message || "An unexpected error occurred. Please try again later."}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
