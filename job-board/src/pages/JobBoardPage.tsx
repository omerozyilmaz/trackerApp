import React from "react";
import Header from "../components/Header";
import JobColumn from "../components/JobColumn";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const JobBoardPage: React.FC = () => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  const wishlistJobs = jobs.filter((job) => job.column === "Wishlist");
  const appliedJobs = jobs.filter((job) => job.column === "Applied");
  const interviewJobs = jobs.filter((job) => job.column === "Interview");

  const handleMoveJob = (id: string, column: string) => {
    console.log(`Moving job ${id} to ${column}`);
  };

  return (
    <div>
      <Header />
      <div className="flex space-x-4 p-4">
        <JobColumn
          title="Wishlist"
          jobs={wishlistJobs}
          onMoveJob={handleMoveJob}
        />
        <JobColumn
          title="Applied"
          jobs={appliedJobs}
          onMoveJob={handleMoveJob}
        />
        <JobColumn
          title="Interview"
          jobs={interviewJobs}
          onMoveJob={handleMoveJob}
        />
      </div>
    </div>
  );
};

export default JobBoardPage;
