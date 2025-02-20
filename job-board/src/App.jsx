import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import JobBoardPage from "./pages/JobBoardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/job-board" element={<JobBoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
