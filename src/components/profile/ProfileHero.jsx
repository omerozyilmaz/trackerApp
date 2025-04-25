import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ProfileHero = ({ firstName, lastName, email, profilePicture }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-sm border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profilePicture || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          <button
            className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            aria-label="Edit profile picture"
          >
            ✏️
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {firstName} {lastName}
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {email}
          </p>
          <div className="mt-4">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
