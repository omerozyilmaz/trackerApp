import React from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { addJob, moveJob } from "../store/jobSlice";

const JobColumn = ({ title, columnKey }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs[columnKey]);

  const handleAddJob = () => {
    const newJob = {
      title: "New Job",
      company: "New Company",
      addedTime: "Just now",
    };
    dispatch(addJob({ column: columnKey, job: newJob }));
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
