import { useState } from "react";
import { useSelector } from "react-redux";
import useJobsApi from "./useJobsApi";
import useDragAndDrop from "./useDragAndDrop";
import { useTheme } from "../context/ThemeContext";

const useJobColumn = (columnKey) => {
  const { isDarkMode } = useTheme();
  const jobs = useSelector((state) => state.jobs[columnKey]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    jobUrl: "",
  });
  const [expandedJobId, setExpandedJobId] = useState(null);

  const { createJob } = useJobsApi();
  const { handleDragStart, handleDrop, handleDragOver } =
    useDragAndDrop(columnKey);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      column: columnKey,
    };

    const result = await createJob(jobData);

    if (result.success) {
      setFormVisible(false);
      setFormData({
        title: "",
        company: "",
        description: "",
        location: "",
        jobUrl: "",
      });
    }
  };

  return {
    isDarkMode,
    jobs,
    isFormVisible,
    formData,
    expandedJobId,
    toggleFormVisibility,
    toggleDetails,
    handleInputChange,
    handleFormSubmit,
    handleDragStart,
    handleDrop,
    handleDragOver,
  };
};

export default useJobColumn;
