import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const ProfileSection = ({ title, items, type }) => {
  const { isDarkMode } = useTheme();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
  };

  const renderContent = (item, index) => {
    switch (type) {
      case "education":
        return (
          <div key={index} className="border-b last:border-b-0 py-4">
            <div
              className="cursor-pointer"
              onClick={() => toggleExpand(index)}
              role="button"
              tabIndex={0}
            >
              <h3 className="text-xl font-semibold mb-1">{item.schoolName}</h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                {item.degree} • {item.fieldOfStudy}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </p>
            </div>
          </div>
        );

      case "experience":
        return (
          <div key={index} className="border-b last:border-b-0 py-4">
            <div
              className="cursor-pointer"
              onClick={() => toggleExpand(index)}
              role="button"
              tabIndex={0}
            >
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                {item.companyName} • {item.location}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </p>
              {expandedId === index && (
                <p
                  className={`mt-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );

      case "projects":
        return (
          <div key={index} className="border-b last:border-b-0 py-4">
            <div
              className="cursor-pointer"
              onClick={() => toggleExpand(index)}
              role="button"
              tabIndex={0}
            >
              <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </p>
              {expandedId === index && (
                <p
                  className={`mt-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-sm border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? "hover:bg-gray-700 text-purple-400"
              : "hover:bg-gray-100 text-purple-600"
          }`}
        >
          + Add {title}
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {items?.length > 0 ? (
          items.map((item, index) => renderContent(item, index))
        ) : (
          <p
            className={`py-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            No {title.toLowerCase()} added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
