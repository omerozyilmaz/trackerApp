import { useTheme } from "../context/ThemeContext";
import useJobsApi from "./useJobsApi";

const useJobCard = (job, index, onDragStart) => {
  const { isDarkMode } = useTheme();
  const { deleteJob } = useJobsApi();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(job.id, job.column || "wishlist");
    }
  };

  const handleDragStart = (e) => {
    onDragStart(e, index);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return {
    isDarkMode,
    handleDelete,
    handleDragStart,
    handleLinkClick,
  };
};

export default useJobCard;
