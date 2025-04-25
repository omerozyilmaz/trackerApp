import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { handleLinkedInCallback } from "../services/authService";
import Layout from "../components/Layout";

const LinkedInCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const response = await handleLinkedInCallback(code);
        if (response.data.token) {
          // Kullanıcı bilgilerini güncelle
          const userData = {
            id: response.data.user.id,
            username:
              response.data.user.username ||
              response.data.user.email.split("@")[0],
            email: response.data.user.email,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setIsAuthenticated(true);

          navigate("/job-board");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("LinkedIn callback error:", error);
        navigate("/login", {
          state: { error: "LinkedIn login failed. Please try again." },
        });
      }
    };

    handleCallback();
  }, [navigate, searchParams, setUser, setIsAuthenticated]);

  return (
    <Layout>
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="text-xl">Processing LinkedIn login...</div>
      </div>
    </Layout>
  );
};

export default LinkedInCallback;
