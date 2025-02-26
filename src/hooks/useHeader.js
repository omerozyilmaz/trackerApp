import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleBoardClick = () => {
    navigate("/job-board");
  };

  return {
    isDarkMode,
    toggleDarkMode,
    isAuthenticated,
    user,
    logout,
    navigate,
    handleNavigate,
    handleBoardClick,
  };
};

export default useHeader;
