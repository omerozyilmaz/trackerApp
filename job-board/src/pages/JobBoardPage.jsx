import React from "react";
import JobColumn from "../components/JobColumn";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";

const JobBoardPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-[#f9f5ff]"
      } transition-colors duration-300`}
    >
      <Header />
      <div className="p-6 grid grid-cols-3 gap-6">
        <JobColumn title="Wishlist" columnKey="wishlist" />
        <JobColumn title="Applied" columnKey="applied" />
        <JobColumn title="Interview" columnKey="interview" />
      </div>
    </div>
  );
};

export default JobBoardPage;
