import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const ProfileHeader = ({ profile, onEditClick, onPictureChange }) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file && onPictureChange) {
      onPictureChange(file);
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-lg border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={profile.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            {isHovered && (
              <label
                htmlFor="profile-picture"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
              >
                <span className="text-white text-sm">Change Picture</span>
                <input
                  type="file"
                  id="profile-picture"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePictureChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1
            className={`text-2xl sm:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {profile.firstName} {profile.lastName}
          </h1>
          <p
            className={`text-lg mt-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {profile.currentPosition}
          </p>
          <p
            className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {profile.location}
          </p>
          <button
            onClick={onEditClick}
            className="mt-4 text-purple-600 hover:text-purple-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
