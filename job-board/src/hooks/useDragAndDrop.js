import { useDispatch } from "react-redux";
import { moveJob as moveJobAction } from "../store/jobSlice";
import useJobsApi from "./useJobsApi";

const useDragAndDrop = (columnKey) => {
  const dispatch = useDispatch();
  const { moveJob } = useJobsApi();

  const handleDragStart = (e, index, jobId) => {
    e.dataTransfer.setData("jobIndex", index);
    e.dataTransfer.setData("jobId", jobId);
    e.dataTransfer.setData("fromColumn", columnKey);
  };

  const handleDrop = async (e) => {
    const jobIndex = e.dataTransfer.getData("jobIndex");
    const jobId = e.dataTransfer.getData("jobId");
    const fromColumn = e.dataTransfer.getData("fromColumn");

    if (fromColumn !== columnKey) {
      // First update the UI optimistically
      dispatch(
        moveJobAction({
          fromColumn,
          toColumn: columnKey,
          jobIndex,
        })
      );

      // Then update the backend
      await moveJob(jobId, fromColumn, columnKey);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return {
    handleDragStart,
    handleDrop,
    handleDragOver,
  };
};

export default useDragAndDrop;
