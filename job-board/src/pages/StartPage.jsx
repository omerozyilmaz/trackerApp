import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <button
        onClick={() => navigate("/job-board")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Go to Job Board
      </button>
    </div>
  );
};

export default StartPage;
