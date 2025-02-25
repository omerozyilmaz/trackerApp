import React from "react";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main
        className={`pt-[76px] min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-[#f9f5ff]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
