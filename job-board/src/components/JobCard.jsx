import React from "react";

const JobCard = ({ job, index, onDragStart }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
    >
      <div className="flex-shrink-0">
        <img
          src="/path/to/company/icon.png"
          alt="Company Icon"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-500">{job.company}</p>
        <p className="text-gray-500">{job.description}</p>
        <p className="text-gray-500">{job.location}</p>
        <p className="text-gray-500">{job.jobUrl}</p>
        <p className="text-gray-400 text-sm">{job.addedTime}</p>
      </div>
    </div>
  );
};

export default JobCard;
