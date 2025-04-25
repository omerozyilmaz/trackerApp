import React, { useEffect } from "react";
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
  const {
    profile,
    isLoading,
    error,
    isEditing,
    createNewProfile,
    updateProfile,
    updateProfilePicture,
    toggleEditMode,
    addEducation,
    updateEducation,
    addExperience,
    updateExperience,
  } = useProfile();
  const { isDarkMode } = useTheme();

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
    if (!result.success) {
      // Handle error
      console.error("Failed to update profile:", result.error);
    }
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const result = await updateProfilePicture(file);
      if (!result.success) {
        // Handle error
        console.error("Failed to update profile picture:", result.error);
      }
    }
  };

  const handleEducationUpdate = (updatedEducation) => {
    handleProfileUpdate({
      ...profile,
      education: updatedEducation,
    });
  };

  const handleExperienceUpdate = (updatedExperience) => {
    handleProfileUpdate({
      ...profile,
      experience: updatedExperience,
    });
  };

  const handleAboutUpdate = (updatedProfile) => {
    handleProfileUpdate(updatedProfile);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {isEditing ? (
          <ProfileForm
            profile={profile}
            onSubmit={handleProfileUpdate}
            onCancel={toggleEditMode}
          />
        ) : (
          <>
            <ProfileHeader
              profile={profile}
              onEditClick={toggleEditMode}
              onPictureChange={handleProfilePictureChange}
            />
            <AboutSection profile={profile} onUpdate={handleAboutUpdate} />
            <EducationSection
              education={profile?.education || []}
              onAdd={addEducation}
              onUpdate={updateEducation}
            />
            <ExperienceSection
              experience={profile?.experience || []}
              onAdd={addExperience}
              onUpdate={updateExperience}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
