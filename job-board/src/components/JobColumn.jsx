import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useFormHandler from "../hooks/useFormHandler";
import useDragAndDrop from "../hooks/useDragAndDrop";

const JobColumn = ({ title, columnKey }) => {
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
      className="bg-gray-100 p-4 rounded-lg shadow-md"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {title} ({jobs.length})
        </h2>
        <button
          onClick={toggleFormVisibility}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          +
        </button>
      </div>
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="border p-1 mr-2"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="border p-1 mr-2"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-1 mr-2"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="border p-1 mr-2"
          />
          <input
            type="text"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleInputChange}
            placeholder="Job URL"
            className="border p-1 mr-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Add Job
          </button>
        </form>
      )}
      <div className="space-y-2">
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
