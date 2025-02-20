import React, { useState } from "react";
import JobCard from "./Jobcard";

interface JobColumnProps {
  title: string;
  jobs: { id: string; title: string; company: string; addedTime: string }[];
  onMoveJob: (id: string, column: string) => void;
}

const JobColumn: React.FC<JobColumnProps> = ({ title, jobs, onMoveJob }) => {
  const [draggedJobId, setDraggedJobId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedJobId(id);
  };

  const handleDrop = () => {
    if (draggedJobId) {
      onMoveJob(draggedJobId, title);
      setDraggedJobId(null);
    }
  };

  return (
    <div
      className="flex flex-col space-y-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h3 className="text-xl font-bold">
        {title} ({jobs.length})
      </h3>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          {...job}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
      <button className="bg-green-500 text-white p-2 rounded">+ Add Job</button>
    </div>
  );
};

export default JobColumn;
