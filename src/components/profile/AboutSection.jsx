import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { setProfileData } from "../../store/slices/profileSlice";

const AboutSection = ({ profile }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile.about || "");

  const handleSave = () => {
    dispatch(setProfileData({ ...profile, about: editData }));
    setIsEditing(false);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-lg border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } mt-6`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">About</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-purple-600 hover:text-purple-700 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editData}
            onChange={(e) => setEditData(e.target.value)}
            className={`w-full px-3 py-2 rounded-md min-h-[150px] ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
            placeholder="Write something about yourself..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData(profile.about || "");
              }}
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
        <p
          className={`whitespace-pre-wrap ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {profile.about || "No description provided yet."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;
