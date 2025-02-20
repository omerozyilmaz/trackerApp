import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white p-4 rounded"
        onClick={() => navigate("/job-board")}
      >
        Go to Job Board
      </button>
    </div>
  );
};

export default StartPage;
