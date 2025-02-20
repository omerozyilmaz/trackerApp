import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import JobBoardPage from "./pages/JobBoardPage";

const App: React.FC = () => {
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
