import React, { useState } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { addJob, moveJob } from "../store/jobSlice";
import { updateFormData, resetFormData } from "../store/formSlice";

const JobColumn = ({ title, columnKey }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs[columnKey]);
  const formData = useSelector((state) => state.form.formData);

  // Local state for form visibility
  const [isFormVisible, setFormVisible] = useState(false);

  const handleAddJob = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...formData,
      addedTime: "Just now",
    };
    dispatch(addJob({ column: columnKey, job: newJob }));
    setFormVisible(false);
    dispatch(resetFormData());
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("jobIndex", index);
    e.dataTransfer.setData("fromColumn", columnKey);
  };

  const handleDrop = (e) => {
    const jobIndex = e.dataTransfer.getData("jobIndex");
    const fromColumn = e.dataTransfer.getData("fromColumn");
    if (fromColumn !== columnKey) {
      dispatch(moveJob({ fromColumn, toColumn: columnKey, jobIndex }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
          onClick={handleAddJob}
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
