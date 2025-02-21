import React from "react";
import JobColumn from "../components/JobColumn";
import Header from "../components/Header";

const JobBoardPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="p-4 grid grid-cols-3 gap-4">
        <JobColumn title="Wishlist" columnKey="wishlist" />
        <JobColumn title="Applied" columnKey="applied" />
        <JobColumn title="Interview" columnKey="interview" />
      </div>
    </div>
  );
};

export default JobBoardPage;
