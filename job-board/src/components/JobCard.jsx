import React from "react";
import { useTheme } from "../context/ThemeContext";

const JobCard = ({
  job,
  index,
  onDragStart,
  isDetailsVisible,
  toggleDetails,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      } p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-move group`}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <img
            src="/path/to/company/icon.png"
            alt="Company Icon"
            className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
          {/* Main Content */}
          <div className="space-y-1 sm:space-y-2">
            <h3
              className={`text-base sm:text-lg lg:text-xl font-medium truncate ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {job.title}
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {job.company}
            </p>
            <a
              href={job.jobUrl}
              className={`text-sm sm:text-base inline-block min-h-[44px] sm:min-h-[unset] ${
                isDarkMode
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-700"
              } hover:underline`}
            >
              View Job
            </a>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleDetails}
            className={`text-sm sm:text-base min-h-[44px] sm:min-h-[unset] ${
              isDarkMode
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-700"
            } transition-colors`}
          >
            {isDetailsVisible ? "Show Less" : "Show More"}
          </button>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isDetailsVisible ? "max-h-48 sm:max-h-56 mt-2 sm:mt-3" : "max-h-0"
            }`}
          >
            <div className="space-y-2 sm:space-y-3">
              <p
                className={`text-sm sm:text-base ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {job.description}
              </p>
              <p
                className={`text-sm sm:text-base ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {job.location}
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {job.addedTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
