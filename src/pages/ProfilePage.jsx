import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProfileHeader from "../components/profile/ProfileHeader";
import AboutSection from "../components/profile/AboutSection";
import EducationSection from "../components/profile/EducationSection";
import ExperienceSection from "../components/profile/ExperienceSection";
import ProfileForm from "../components/profile/ProfileForm";
import useProfile from "../hooks/useProfile";
import { useTheme } from "../context/ThemeContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const ProfilePage = () => {
  const { profile, isLoading, error, createNewProfile, updateProfile } =
    useProfile();
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (error?.includes("404")) {
      createNewProfile();
    }
  }, [error]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && !error.includes("404")) {
    return <ErrorMessage message={error} />;
  }

  const handleProfileUpdate = async (updatedData) => {
    const result = await updateProfile(updatedData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {isEditing ? (
          <ProfileForm
            profile={profile}
            onSubmit={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ProfileHeader
              profile={profile}
              onEditClick={() => setIsEditing(true)}
            />
            <AboutSection profile={profile} />
            <EducationSection education={profile?.education || []} />
            <ExperienceSection experience={profile?.experience || []} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
