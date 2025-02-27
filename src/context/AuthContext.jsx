import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as loginService,
  register as registerService,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginService(credentials);

      if (response.data && response.data.token) {
        const userData = {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
        };

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);

        navigate("/job-board");

        return { success: true };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerService(userData);

      if (response.data && response.data.success) {
        // Başarılı kayıt sonrası otomatik login
        const loginResponse = await loginService({
          email: userData.email,
          password: userData.password,
        });

        if (loginResponse.data && loginResponse.data.token) {
          const user = {
            id: loginResponse.data.user.id,
            username: loginResponse.data.user.username,
            email: loginResponse.data.user.email,
          };

          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("user", JSON.stringify(user));

          setUser(user);
          setIsAuthenticated(true);

          navigate("/job-board");

          return { success: true };
        } else {
          // Kayıt başarılı ama otomatik login başarısız
          navigate("/login");
          return {
            success: true,
            message: "Registration successful. Please login.",
          };
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
