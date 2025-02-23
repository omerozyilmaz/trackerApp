import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useFormHandler from "../hooks/useFormHandler";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { useTheme } from "../context/ThemeContext";

const JobColumn = ({ title, columnKey }) => {
  const { isDarkMode } = useTheme();
  const jobs = useSelector((state) => state.jobs[columnKey]);
  const {
    isFormVisible,
    toggleFormVisibility,
    handleInputChange,
    handleFormSubmit,
    formData,
  } = useFormHandler(columnKey);

  const { handleDragStart, handleDrop, handleDragOver } =
    useDragAndDrop(columnKey);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      } rounded-xl p-4 shadow-sm border transition-all hover:shadow-md`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2
            className={`font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-700"
            }`}
          >
            {title}
            <span
              className={`ml-2 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-400"
              }`}
            >
              ({jobs.length} JOBS)
            </span>
          </h2>
        </div>
        <button
          onClick={toggleFormVisibility}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            isDarkMode
              ? "hover:bg-gray-700 text-gray-400 hover:text-purple-400"
              : "hover:bg-gray-50 text-gray-400 hover:text-purple-600"
          } transition-colors`}
        >
          +
        </button>
      </div>
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="mb-4 space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleInputChange}
            placeholder="Job URL"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Add Job
          </button>
        </form>
      )}
      <div className="space-y-3">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            index={index}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default JobColumn;
