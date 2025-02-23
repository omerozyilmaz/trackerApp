import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import JobBoardPage from "./pages/JobBoardPage";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/job-board" element={<JobBoardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
