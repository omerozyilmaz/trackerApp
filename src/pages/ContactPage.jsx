import React from "react";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

const ContactPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-[#f9f5ff]"
      } transition-colors duration-300`}
    >
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div
          className={`max-w-3xl mx-auto rounded-xl shadow-lg p-8 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1
            className={`text-3xl font-bold mb-8 text-center ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get In Touch
          </h1>

          <div className="space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="/profile-photo.png"
                  alt="Ömer Özyılmaz"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/128?text=ÖÖ";
                  }}
                />
              </div>
              <div className="text-center md:text-left">
                <h2
                  className={`text-2xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Ömer Özyılmaz
                </h2>
                <p
                  className={`mt-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Full Stack Developer
                </p>
                <p
                  className={`mt-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  I'm a full stack developer who wants to give a new direction
                  to my career and is open to learning.
                </p>
              </div>
            </div>

            {/* Contact Links */}
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://www.linkedin.com/in/omerozyilmaz/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center p-6 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <div
                  className={`text-4xl mb-3 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  in
                </div>
                <span
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  LinkedIn
                </span>
                <span
                  className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Connect with me
                </span>
              </a>

              <a
                href="https://github.com/omerozyilmaz"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center p-6 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <div
                  className={`text-4xl mb-3 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  GH
                </div>
                <span
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  GitHub
                </span>
                <span
                  className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Check my projects
                </span>
              </a>

              <a
                href="mailto:omerozylmaz2@gmail.com"
                className={`flex flex-col items-center p-6 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <div
                  className={`text-4xl mb-3 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  @
                </div>
                <span
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Email
                </span>
                <span
                  className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  omerozylmaz2@gmail.com
                </span>
              </a>
            </div>

            {/* Message Section */}
            <div
              className={`mt-8 p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-purple-50"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Project Ideas & Collaboration
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Feel free to email me if you have any project ideas or
                collaboration opportunities. I'm always open to discussing new
                and exciting ventures in the tech world!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
