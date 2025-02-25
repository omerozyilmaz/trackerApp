import { useState } from "react";
import { useDispatch } from "react-redux";
import { jobsAPI } from "../services/api";
import {
  setJobs,
  addJob as addJobAction,
  updateJob as updateJobAction,
  deleteJob as deleteJobAction,
  moveJob as moveJobAction,
} from "../store/jobSlice";

const useJobsApi = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await jobsAPI.getJobs();

      // Transform the jobs data to match the expected format in the Redux store
      const jobsByColumn = {
        wishlist: [],
        applied: [],
        interview: [],
      };

      response.data.forEach((job) => {
        const column = job.column.toLowerCase();
        if (jobsByColumn[column]) {
          jobsByColumn[column].push({
            id: job.id,
            title: job.title,
            company: job.company,
            description: job.description || "",
            location: job.location || "",
            jobUrl: job.jobUrl || "",
            column: column,
            addedTime: new Date(job.createdAt).toLocaleDateString(),
          });
        }
      });

      dispatch(setJobs(jobsByColumn));
      return { success: true, data: jobsByColumn };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch jobs";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Create a new job
  const createJob = async (jobData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jobsAPI.createJob(jobData);
      const newJob = {
        id: response.data.id,
        title: response.data.title,
        company: response.data.company,
        description: response.data.description || "",
        location: response.data.location || "",
        jobUrl: response.data.jobUrl || "",
        addedTime: "Just now",
      };

      dispatch(
        addJobAction({ column: jobData.column.toLowerCase(), job: newJob })
      );
      return { success: true, data: newJob };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create job";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update a job
  const updateJob = async (id, jobData, columnKey) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jobsAPI.updateJob(id, jobData);
      const updatedJob = {
        id: response.data.id,
        title: response.data.title,
        company: response.data.company,
        description: response.data.description || "",
        location: response.data.location || "",
        jobUrl: response.data.jobUrl || "",
        addedTime: new Date(response.data.updatedAt).toLocaleDateString(),
      };

      dispatch(updateJobAction({ column: columnKey, jobId: id, updatedJob }));
      return { success: true, data: updatedJob };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update job";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete a job
  const deleteJob = async (jobId, column) => {
    setLoading(true);
    setError(null);

    try {
      await jobsAPI.deleteJob(jobId);

      dispatch(deleteJobAction({ column, jobId }));

      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete job";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Move a job to a different column
  const moveJob = async (id, fromColumn, toColumn) => {
    setLoading(true);
    setError(null);

    try {
      await jobsAPI.moveJob(id, toColumn);
      dispatch(moveJobAction({ fromColumn, toColumn, jobId: id }));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to move job";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    moveJob,
  };
};

export default useJobsApi;
