import React from "react";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/Layout";
import ProfileHero from "../components/profile/ProfileHero";
import ProfileSection from "../components/profile/ProfileSection";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const { isDarkMode } = useTheme();
  const { profileData, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="text-xl">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="text-red-500">Error loading profile: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={`max-w-4xl mx-auto space-y-6 ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <ProfileHero
          firstName={profileData?.firstName}
          lastName={profileData?.lastName}
          email={profileData?.email}
          profilePicture={profileData?.profilePicture}
        />

        <ProfileSection
          title="Education"
          items={profileData?.education}
          type="education"
        />

        <ProfileSection
          title="Experience"
          items={profileData?.experience}
          type="experience"
        />

        <ProfileSection
          title="Projects"
          items={profileData?.projects}
          type="projects"
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;
