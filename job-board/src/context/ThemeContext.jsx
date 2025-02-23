import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  // Toggle theme function using prevMode pattern
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      // Calculate new mode
      const newMode = !prevMode;

      // Update localStorage
      localStorage.setItem("theme", newMode ? "dark" : "light");

      // Log state change
      console.log("Theme toggled:", newMode ? "dark" : "light");

      return newMode;
    });
  };

  // Sync with DOM on mount and state change
  useEffect(() => {
    // Log current state
    console.log("Theme state changed:", isDarkMode ? "dark" : "light");

    // Update DOM classes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add transition styles
    document.documentElement.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
