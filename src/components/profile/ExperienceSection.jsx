import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useProfile from "../../hooks/useProfile";

const ExperienceSection = ({ experience = [] }) => {
  const { isDarkMode } = useTheme();
  const { updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAdd = async () => {
    if (newExperience.title && newExperience.company) {
      const updatedExperience = [...experience, newExperience];
      const result = await updateProfile({ experience: updatedExperience });
      if (result.success) {
        setNewExperience({
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setIsEditing(false);
      }
    }
  };

  const handleDelete = async (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    await updateProfile({ experience: updatedExperience });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-lg border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } mt-6`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-purple-600 hover:text-purple-700 transition-colors"
        >
          {isEditing ? "Cancel" : "Add Experience"}
        </button>
      </div>

      {isEditing && (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="title"
            value={newExperience.title}
            onChange={handleChange}
            placeholder="Job Title"
            className={`w-full px-3 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="company"
            value={newExperience.company}
            onChange={handleChange}
            placeholder="Company"
            className={`w-full px-3 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="location"
            value={newExperience.location}
            onChange={handleChange}
            placeholder="Location"
            className={`w-full px-3 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            />
            <input
              type="date"
              name="endDate"
              value={newExperience.endDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            />
          </div>
          <textarea
            name="description"
            value={newExperience.description}
            onChange={handleChange}
            placeholder="Description"
            className={`w-full px-3 py-2 rounded-md min-h-[100px] ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Add
          </button>
        </div>
      )}

      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-sm text-gray-500">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : "Present"}
                </p>
                {exp.description && (
                  <p className="mt-2 text-sm whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
