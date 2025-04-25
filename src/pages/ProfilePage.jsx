import React from "react";
import Layout from "../components/Layout";
import ProfileHeader from "../components/profile/ProfileHeader";
import AboutSection from "../components/profile/AboutSection";
import EducationSection from "../components/profile/EducationSection";
import ExperienceSection from "../components/profile/ExperienceSection";
import ProfileForm from "../components/profile/ProfileForm";
import useProfile from "../hooks/useProfile";
import { useTheme } from "../context/ThemeContext";

const ProfilePage = () => {
  const {
    profile,
    isLoading,
    error,
    isEditing,
    updateProfile,
    updateProfilePicture,
    toggleEditMode,
  } = useProfile();
  const { isDarkMode } = useTheme();

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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </Layout>
    );
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
            <AboutSection profile={profile} />
            <EducationSection
              education={profile.education}
              onUpdate={handleEducationUpdate}
            />
            <ExperienceSection
              experience={profile.experience}
              onUpdate={handleExperienceUpdate}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
