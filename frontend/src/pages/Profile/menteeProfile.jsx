import { useState, useEffect } from 'react';
import { Camera, Edit2, X, Check } from 'lucide-react'; 
import InfoRow from './InfoRow';
import TextAreaRow from './TextAreaRow';

export default function MenteeProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    linkedinUrl: "",
    education: "",
    skills: "",
    careerInterests: "",
    goal: "",
    bio: "",
    profile_photo: "",
  });
  
  const [tempData, setTempData] = useState({...profileData});
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to load data from localStorage
  // Uses || "" to provide empty string fallbacks
  const loadLocalStorageData = () => {
    const newProfileData = {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      jobTitle: user?.jobTitle || "",
      linkedinUrl: user?.linkedinUrl || "",
      education: user?.education || "",
      skills: Array.isArray(user?.skills) ? user.skills.join(', ') : (user?.skills || ""),
      careerInterests: user?.careerInterests || "",
      goal: user?.goal || "",
      bio: user?.bio || "",
      profile_photo: user?.profile_photo || "",
    };
    setProfileData(newProfileData);
    setTempData(newProfileData);
  };

  // Load profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:2999/api/mentees/${userId}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const backendData = result.data;
            const newProfileData = {
              firstName: backendData.first_name || "",
              lastName: backendData.last_name || "",
              email: backendData.email || "",
              phone: backendData.phone || "",
              location: backendData.location || "",
              jobTitle: backendData.jobTitle || "",
              linkedinUrl: backendData.linkedinUrl || "",
              education: backendData.education || "",
              skills: Array.isArray(backendData.skills) ? backendData.skills.join(', ') : (backendData.skills || ""),
              careerInterests: backendData.careerInterests || "",
              goal: backendData.goal || "",
              bio: backendData.bio || "",
              profile_photo: backendData.profile_photo || "",
            };
            setProfileData(newProfileData);
            setTempData(newProfileData);
            
            // Update localStorage with fresh data from backend
            const currentUser = JSON.parse(localStorage.getItem("user"));
            const updatedUser = {
              ...currentUser,
              ...backendData,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } else {
          // If API fails, use localStorage data
          loadLocalStorageData();
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        // Fallback to localStorage data
        loadLocalStorageData();
      }
    };

    if (userId) {
      loadProfileData();
    }
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({...profileData});
    setSelectedFile(null);
  };

  const handleCancel = () => {
  setIsEditing(false);
  setTempData({...profileData});
  setSelectedFile(null);
  
  // Reset any temporary photo preview
  if (tempData.profile_photo.startsWith('blob:')) {
    URL.revokeObjectURL(tempData.profile_photo);
  }
};

  const handleSave = async () => {
  setIsLoading(true);
  try {
    let response;
    
    if (selectedFile) {
      // If there's a new photo, use FormData
      const formData = new FormData();
      formData.append('profile_photo', selectedFile);
      
      // Add all other fields to FormData
      formData.append('first_name', tempData.firstName);
      formData.append('last_name', tempData.lastName);
      formData.append('email', tempData.email);
      formData.append('phone', tempData.phone || "");
      formData.append('location', tempData.location || "");
      formData.append('jobTitle', tempData.jobTitle || "");
      formData.append('linkedinUrl', tempData.linkedinUrl || "");
      formData.append('education', tempData.education || "");
      formData.append('skills', tempData.skills || "");
      formData.append('careerInterests', tempData.careerInterests || "");
      formData.append('goal', tempData.goal || "");
      formData.append('bio', tempData.bio || "");

      console.log('Sending update with FormData (with photo)');

      response = await fetch(`http://localhost:2999/api/mentees/${userId}`, {
        method: 'PUT',
        body: formData
      });
    } else {
      // If no new photo, use JSON
      const updateData = {
        first_name: tempData.firstName,
        last_name: tempData.lastName, 
        email: tempData.email,
        phone: tempData.phone || "",
        location: tempData.location || "",
        jobTitle: tempData.jobTitle || "",
        linkedinUrl: tempData.linkedinUrl || "",
        education: tempData.education || "",
        skills: tempData.skills || "",
        careerInterests: tempData.careerInterests || "",
        goal: tempData.goal || "",
        bio: tempData.bio || "",
      };

      console.log('Sending update as JSON:', updateData);

      response = await fetch(`http://localhost:2999/api/mentees/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    console.log('Update response:', result);

    // FIXED: Update both state and localStorage immediately
    if (result.success && result.data) {
      const updatedData = result.data;
      
      // Update profile state - PRESERVE EXISTING PHOTO IF NO NEW PHOTO
      const updatedProfileData = {
        firstName: updatedData.first_name || tempData.firstName,
        lastName: updatedData.last_name || tempData.lastName,
        email: updatedData.email || tempData.email,
        phone: updatedData.phone || tempData.phone,
        location: updatedData.location || tempData.location,
        jobTitle: updatedData.jobTitle || tempData.jobTitle,
        linkedinUrl: updatedData.linkedinUrl || tempData.linkedinUrl,
        education: updatedData.education || tempData.education,
        skills: Array.isArray(updatedData.skills) ? updatedData.skills.join(', ') : (updatedData.skills || tempData.skills),
        careerInterests: updatedData.careerInterests || tempData.careerInterests,
        goal: updatedData.goal || tempData.goal,
        bio: updatedData.bio || tempData.bio,
        // ✅ CRITICAL FIX: Preserve photo - use new one if uploaded, otherwise keep existing
        profile_photo: selectedFile ? (updatedData.profile_photo || profileData.profile_photo) : profileData.profile_photo,
      };
      
      setProfileData(updatedProfileData);
      
      // ✅ CRITICAL: Update localStorage with current user data
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...currentUser,
        first_name: updatedData.first_name || tempData.firstName,
        last_name: updatedData.last_name || tempData.lastName,
        email: updatedData.email || tempData.email,
        phone: updatedData.phone || tempData.phone,
        location: updatedData.location || tempData.location,
        jobTitle: updatedData.jobTitle || tempData.jobTitle,
        linkedinUrl: updatedData.linkedinUrl || tempData.linkedinUrl,
        education: updatedData.education || tempData.education,
        skills: updatedData.skills || tempData.skills,
        careerInterests: updatedData.careerInterests || tempData.careerInterests,
        goal: updatedData.goal || tempData.goal,
        bio: updatedData.bio || tempData.bio,
        profile_photo: selectedFile ? (updatedData.profile_photo || currentUser.profile_photo) : currentUser.profile_photo,
      };
      
      console.log('🔄 Updating localStorage with:', updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setIsEditing(false);
    setSelectedFile(null);
    alert('Profile updated successfully!');
    
  } catch (error) {
    console.error('Error updating profile:', error);
    alert(`Error updating profile: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePhotoChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please select an image smaller than 5MB.');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    
    // Clean up previous blob URL to prevent memory leaks
    if (tempData.profile_photo.startsWith('blob:')) {
      URL.revokeObjectURL(tempData.profile_photo);
    }
    
    // Create temporary URL for preview
    const tempUrl = URL.createObjectURL(file);
    setTempData(prev => ({
      ...prev,
      profile_photo: tempUrl
    }));
    setSelectedFile(file);
  }
};

  const getProfilePhotoUrl = () => {
    const photo = isEditing ? tempData.profile_photo : profileData.profile_photo;
    
    console.log('🖼️ Current photo:', photo); // Debug log
    
    if (!photo) return "/default-avatar.png";
    
    // If it's a blob URL (temporary preview during editing)
    if (photo.startsWith('blob:') || photo.startsWith('data:')) {
      return photo;
    }
    
    // If it's just a filename, construct the full URL
    if (photo && !photo.startsWith('http')) {
      const fullUrl = `http://localhost:2999/uploads/profiles/${photo}`;
      // console.log('🖼️ Constructed URL:', fullUrl); // Debug log
      return fullUrl;
    }
    
    return photo || "/default-avatar.png";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black">Mentee Profile</h1>
              <p className="text-black-100 mt-1">View and manage your information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                disabled={isLoading}
                className="bg-white hover:bg-blue-50 text-blue-600 p-3 rounded-full transition-colors shadow-md disabled:opacity-50"
              >
                <Edit2 size={20} />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-white hover:bg-green-50 text-green-600 p-3 rounded-full transition-colors shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Check size={20} />
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="bg-white hover:bg-red-50 text-red-600 p-3 rounded-full transition-colors shadow-md disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8">
            {isLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p>Updating profile...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Photo */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-200">
              <div className="relative">
                <img
                  src={getProfilePhotoUrl()}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                  onError={(e) => {
                    console.error('🖼️ Image failed to load, using default');
                    e.target.src = "/default-avatar.png";
                  }}
                />
                {isEditing && (
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                  >
                    <Camera size={20} />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {isEditing && (
                <p className="text-sm text-gray-500 mt-3">
                  {selectedFile ? 'New photo selected' : 'Click the camera icon to change photo'}
                </p>
              )}
            </div>

            {/* Information Fields */}
            <div className="space-y-0">
              <InfoRow 
                label="First Name"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="firstName"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Last Name"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="lastName"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Email"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="email"
                type="email"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Phone"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="phone"
                type="tel"
                placeholder="Optional"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Location"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="location"
                placeholder="Optional - City, Country"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Job Title"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="jobTitle"
                placeholder="Optional - Your current job title"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="LinkedIn URL"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="linkedinUrl"
                type="url"
                placeholder="Optional - Your LinkedIn profile URL"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Education"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="education"
                placeholder="Optional - Your educational background"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Skills"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="skills"
                placeholder="Optional - Comma separated skills (e.g., JavaScript, React, Node.js)"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Career Interests"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="careerInterests"
                placeholder="Optional - Your career goals or interests"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <InfoRow 
                label="Goal"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="goal"
                placeholder="Optional - What do you want to achieve through mentoring?"
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <TextAreaRow 
                label="Bio"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="bio"
                placeholder="Optional - Tell us about yourself..."
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}