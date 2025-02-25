import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const FeatureCard = ({ icon, title, description }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`p-6 rounded-xl ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="w-12 h-12 mb-4 text-purple-600">{icon}</div>
      <h3
        className={`text-xl font-semibold mb-3 ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-[#f9f5ff]"
      } transition-colors duration-300`}
    >
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Manage Your Job Search Journey
          </h1>
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Track applications, organize interviews, and manage your job search
            process all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() =>
                isAuthenticated ? navigate("/job-board") : navigate("/login")
              }
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isAuthenticated ? "Go to Job Board" : "Get Started"}
            </button>
            {!isAuthenticated && (
              <button
                onClick={() => navigate("/register")}
                className={`px-6 py-3 rounded-lg border ${
                  isDarkMode
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                } transition-colors`}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📋"
              title="Kanban Board"
              description="Organize your job applications with an intuitive drag-and-drop interface."
            />
            <FeatureCard
              icon="🎯"
              title="Application Tracking"
              description="Keep track of all your applications and their current status."
            />
            <FeatureCard
              icon="🔄"
              title="Progress Management"
              description="Monitor your job search progress with detailed insights and statistics."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        className={`py-16 px-4 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            See It In Action
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <img
              src="/demo-screenshot.png"
              alt="Job Board Demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
