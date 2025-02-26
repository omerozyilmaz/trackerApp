import API_URL from "../config/api.js";

export const buildApiUrl = (endpoint) => {
  return `${API_URL}/${endpoint}`;
};
