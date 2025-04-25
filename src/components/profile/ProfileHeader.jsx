import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { setProfileData } from "../../store/slices/profileSlice";

const ProfileHeader = ({ profile }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  const handleSave = () => {
    dispatch(setProfileData(editData));
    setIsEditing(false);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-lg border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profile.profilePicture || "/default-avatar.png"}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          <button
            className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            aria-label="Change profile picture"
          >
            📷
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) =>
                    setEditData({ ...editData, firstName: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) =>
                    setEditData({ ...editData, lastName: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  placeholder="Last Name"
                />
              </div>
              <input
                type="text"
                value={editData.currentPosition}
                onChange={(e) =>
                  setEditData({ ...editData, currentPosition: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
                placeholder="Current Position"
              />
              <input
                type="text"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
                placeholder="Location"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  } hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {profile.currentPosition}
                  </p>
                  <p
                    className={`mt-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    📍 {profile.location}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
