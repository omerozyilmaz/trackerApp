import React from "react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  addedTime: string;
  onDragStart: (id: string) => void;
  onDrop: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  addedTime,
  onDragStart,
  onDrop,
}) => {
  return (
    <div
      className="bg-white p-4 rounded shadow-md"
      draggable
      onDragStart={() => onDragStart(id)}
      onDrop={() => onDrop(id)}
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{company}</p>
      <p className="text-xs text-gray-400">{addedTime}</p>
    </div>
  );
};

export default JobCard;
