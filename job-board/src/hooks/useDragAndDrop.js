import { useDispatch } from "react-redux";
import { moveJob } from "../store/jobSlice";

const useDragAndDrop = (columnKey) => {
  const dispatch = useDispatch();

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("jobIndex", index);
    e.dataTransfer.setData("fromColumn", columnKey);
  };

  const handleDrop = (e) => {
    const jobIndex = e.dataTransfer.getData("jobIndex");
    const fromColumn = e.dataTransfer.getData("fromColumn");
    if (fromColumn !== columnKey) {
      dispatch(moveJob({ fromColumn, toColumn: columnKey, jobIndex }));
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
