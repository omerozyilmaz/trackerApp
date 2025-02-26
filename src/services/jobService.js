import axios from "axios";
import API_URL from "../config/api.js";

const getAllJobs = async () => {
  return axios.get(`${API_URL}/jobs`);
};

const getJobById = async (id) => {
  return axios.get(`${API_URL}/jobs/${id}`);
};

const createJob = async (jobData) => {
  return axios.post(`${API_URL}/jobs`, jobData);
};

const updateJob = async (id, jobData) => {
  return axios.put(`${API_URL}/jobs/${id}`, jobData);
};

const deleteJob = async (id) => {
  return axios.delete(`${API_URL}/jobs/${id}`);
};

// Fonksiyonları dışa aktarıyoruz
export { getAllJobs, getJobById, createJob, updateJob, deleteJob };
