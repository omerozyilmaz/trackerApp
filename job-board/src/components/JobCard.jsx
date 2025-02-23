import React from "react";

const JobCard = ({ job, index, onDragStart }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-move group"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <img
            src="/path/to/company/icon.png"
            alt="Company Icon"
            className="w-10 h-10 rounded-full bg-gray-100"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500">{job.company}</p>
          <p className="text-sm text-gray-500 truncate">{job.description}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
          <a
            href={job.jobUrl}
            className="text-purple-600 hover:underline text-sm"
          >
            View Job
          </a>
          <p className="mt-2 text-xs text-gray-400">{job.addedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
