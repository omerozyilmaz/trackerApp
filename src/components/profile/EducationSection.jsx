import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const EducationSection = ({ education = [], onUpdate }) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      onUpdate([...education, newEducation]);
      setNewEducation({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setIsEditing(false);
    }
  };

  const handleDelete = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    onUpdate(updatedEducation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({
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
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-purple-600 hover:text-purple-700 transition-colors"
        >
          {isEditing ? "Cancel" : "Add Education"}
        </button>
      </div>

      {isEditing && (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="school"
            value={newEducation.school}
            onChange={handleChange}
            placeholder="School"
            className={`w-full px-3 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="degree"
            value={newEducation.degree}
            onChange={handleChange}
            placeholder="Degree"
            className={`w-full px-3 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="fieldOfStudy"
            value={newEducation.fieldOfStudy}
            onChange={handleChange}
            placeholder="Field of Study"
            className={`w-full px-3 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          />
          <div className="flex gap-4">
            <input
              type="date"
              name="startDate"
              value={newEducation.startDate}
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
              value={newEducation.endDate}
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
            value={newEducation.description}
            onChange={handleChange}
            placeholder="Description"
            className={`w-full px-3 py-2 rounded-md ${
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
        {education.map((edu, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{edu.school}</h3>
                <p className="text-sm text-gray-500">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).getFullYear()
                    : "Present"}
                </p>
                {edu.description && (
                  <p className="mt-2 text-sm">{edu.description}</p>
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

export default EducationSection;
