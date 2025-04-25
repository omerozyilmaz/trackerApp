import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const ProfileForm = ({ profile, onSubmit, onCancel }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    headline: profile?.headline || "",
    summary: profile?.summary || "",
    location: profile?.location || "",
    website: profile?.website || "",
    skills: profile?.skills || [],
    education: profile?.education || [],
    experience: profile?.experience || [],
    projects: profile?.projects || [],
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sadece değişen alanları gönder
    const updatedData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== profile[key]) {
        updatedData[key] = formData[key];
      }
    });
    onSubmit(updatedData);
  };

  const inputClassName = `w-full px-3 py-2 rounded-md ${
    isDarkMode
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-gray-900 border-gray-300"
  } border focus:outline-none focus:ring-2 focus:ring-purple-500`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Headline
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            className={inputClassName}
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className={`${inputClassName} min-h-[100px]`}
            placeholder="Write a brief summary about yourself..."
          />
        </div>

        <div>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={inputClassName}
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className={inputClassName}
            placeholder="e.g., https://yourwebsite.com"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <label
          className={`block text-sm font-medium ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Skills
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className={inputClassName}
            placeholder="Add a skill"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {skill}
              <button
                type="button"
                onClick={() => handleSkillRemove(skill)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`px-6 py-2 rounded-md ${
            isDarkMode
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-200 text-gray-700"
          } hover:opacity-80 transition-opacity`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
