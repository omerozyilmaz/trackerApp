import React, { useEffect } from "react";
import Layout from "../components/Layout";
import JobColumn from "../components/JobColumn";
import useJobsApi from "../hooks/useJobsApi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const JobBoardPage = () => {
  const { fetchJobs, loading, error } = useJobsApi();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
          <div
            className={`text-xl mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Please log in to view your job board
          </div>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="text-xl">Loading jobs...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
          <JobColumn title="Wishlist" columnKey="wishlist" />
          <JobColumn title="Applied" columnKey="applied" />
          <JobColumn title="Interview" columnKey="interview" />
        </div>
      )}
    </Layout>
  );
};

export default JobBoardPage;
