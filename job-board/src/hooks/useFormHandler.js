import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, resetFormData } from "../store/formSlice";
import { addJob } from "../store/jobSlice";

const useFormHandler = (columnKey) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleDetails = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...formData,
      addedTime: "Just now",
    };
    dispatch(addJob({ column: columnKey, job: newJob }));
    setFormVisible(false);
    dispatch(resetFormData());
  };

  return {
    isFormVisible,
    isDetailsVisible,
    toggleFormVisibility,
    toggleDetails,
    handleInputChange,
    handleFormSubmit,
    formData,
  };
};

export default useFormHandler;
