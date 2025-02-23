import React from "react";
import Layout from "../components/Layout";
import JobColumn from "../components/JobColumn";

const JobBoardPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
        <JobColumn title="Wishlist" columnKey="wishlist" />
        <JobColumn title="Applied" columnKey="applied" />
        <JobColumn title="Interview" columnKey="interview" />
      </div>
    </Layout>
  );
};

export default JobBoardPage;
