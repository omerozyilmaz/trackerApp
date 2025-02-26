const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};
