import { useState, useEffect } from 'react';
import { Camera, Edit2, X, Check } from 'lucide-react';
import InfoRow from './InfoRow';
import TextAreaRow from './TextAreaRow';
import { validateForm, validateField, isFormValid } from '../../utils/validation/mentor/mentorProfileValidationUtils';

export default function MentorProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    location: "",
    category: "",
    skills: "",
    bio: "",
    linkedinUrl: "",
    personalWebsite: "",
    introVideoUrl: "",
    featuredArticleUrl: "",
    whyBecomeMentor: "",
    greatestAchievement: "",
    profile_photo: "",
  });
  
  const [tempData, setTempData] = useState({...profileData});
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Load profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:2999/api/mentors/${userId}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const backendData = result.data;
            const newProfileData = {
              firstName: backendData.first_name || "",
              lastName: backendData.last_name || "",
              email: backendData.email || "",
              company: backendData.company || "",
              jobTitle: backendData.job_title || backendData.jobTitle || "",
              location: backendData.location || "",
              category: backendData.category || "",
              skills: Array.isArray(backendData.skills) ? backendData.skills.join(', ') : (backendData.skills || ""),
              bio: backendData.bio || "",
              linkedinUrl: backendData.linkedin_url || backendData.linkedinUrl || "",
              personalWebsite: backendData.personal_website || backendData.personalWebsite || "",
              introVideoUrl: backendData.intro_video_url || backendData.introVideoUrl || "",
              featuredArticleUrl: backendData.featured_article_url || backendData.featuredArticleUrl || "",
              whyBecomeMentor: backendData.why_become_mentor || backendData.whyBecomeMentor || "",
              greatestAchievement: backendData.greatest_achievement || backendData.greatestAchievement || "",
              profile_photo: backendData.profile_photo || "",
            };
            setProfileData(newProfileData);
            setTempData(newProfileData);
            
            const currentUser = JSON.parse(localStorage.getItem("user"));
            const updatedUser = {
              ...currentUser,
              ...backendData,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } else {
          loadLocalStorageData();
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        loadLocalStorageData();
      }
    };

    const loadLocalStorageData = () => {
      const newProfileData = {
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        email: user?.email || "",
        company: user?.company || "",
        jobTitle: user?.jobTitle || "",
        location: user?.location || "",
        category: user?.category || "",
        skills: Array.isArray(user?.skills) ? user.skills.join(', ') : (user?.skills || ""),
        bio: user?.bio || "",
        linkedinUrl: user?.linkedinUrl || "",
        personalWebsite: user?.personalWebsite || "",
        introVideoUrl: user?.introVideoUrl || "",
        featuredArticleUrl: user?.featuredArticleUrl || "",
        whyBecomeMentor: user?.whyBecomeMentor || "",
        greatestAchievement: user?.greatestAchievement || "",
        profile_photo: user?.profile_photo || "",
      };
      setProfileData(newProfileData);
      setTempData(newProfileData);
    };

    if (userId) {
      loadProfileData();
    } else {
      loadLocalStorageData();
    }
  }, [userId]);

  // Validate form
  const handleFormValidation = () => {
    const newErrors = validateForm(tempData);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  // Real-time field validation
  const handleFieldValidation = (name, value) => {
    const fieldErrors = validateField(name, value, errors);
    setErrors(fieldErrors);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({...profileData});
    setSelectedFile(null);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({...profileData});
    setSelectedFile(null);
    setErrors({});
  };

  const handleSave = async () => {
    if (!handleFormValidation()) {
      alert('Please complete all required fields marked with * and ensure all information is correct before saving.');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      
      if (selectedFile) {
        const formData = new FormData();
        formData.append('profile_photo', selectedFile);
        formData.append('first_name', tempData.firstName);
        formData.append('last_name', tempData.lastName);
        formData.append('email', tempData.email);
        formData.append('company', tempData.company);
        formData.append('jobTitle', tempData.jobTitle);
        formData.append('location', tempData.location);
        formData.append('category', tempData.category);
        formData.append('skills', tempData.skills || "");
        formData.append('bio', tempData.bio);
        formData.append('linkedinUrl', tempData.linkedinUrl);
        formData.append('personal_website', tempData.personalWebsite || "");
        formData.append('intro_video_url', tempData.introVideoUrl || "");
        formData.append('featured_article_url', tempData.featuredArticleUrl || "");
        formData.append('why_become_mentor', tempData.whyBecomeMentor || "");
        formData.append('greatest_achievement', tempData.greatestAchievement || "");

        response = await fetch(`http://localhost:2999/api/mentors/${userId}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        const updateData = {
          first_name: tempData.firstName,
          last_name: tempData.lastName,
          email: tempData.email,
          company: tempData.company,
          jobTitle: tempData.jobTitle,
          location: tempData.location,
          category: tempData.category,
          skills: tempData.skills || "",
          bio: tempData.bio,
          linkedinUrl: tempData.linkedinUrl,
          personal_website: tempData.personalWebsite || "",
          intro_video_url: tempData.introVideoUrl || "",
          featured_article_url: tempData.featuredArticleUrl || "",
          why_become_mentor: tempData.whyBecomeMentor || "",
          greatest_achievement: tempData.greatestAchievement || "",
        };

        response = await fetch(`http://localhost:2999/api/mentors/${userId}`, {
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

      if (result.success && result.data) {
        const updatedData = result.data;
        
        const updatedProfileData = {
          firstName: updatedData.first_name || tempData.firstName,
          lastName: updatedData.last_name || tempData.lastName,
          email: updatedData.email || tempData.email,
          company: updatedData.company || tempData.company,
          jobTitle: updatedData.job_title || updatedData.jobTitle || tempData.jobTitle,
          location: updatedData.location || tempData.location,
          category: updatedData.category || tempData.category,
          skills: Array.isArray(updatedData.skills) ? updatedData.skills.join(', ') : (updatedData.skills || tempData.skills),
          bio: updatedData.bio || tempData.bio,
          linkedinUrl: updatedData.linkedin_url || updatedData.linkedinUrl || tempData.linkedinUrl,
          personalWebsite: updatedData.personal_website || updatedData.personalWebsite || tempData.personalWebsite,
          introVideoUrl: updatedData.intro_video_url || updatedData.introVideoUrl || tempData.introVideoUrl,
          featuredArticleUrl: updatedData.featured_article_url || updatedData.featuredArticleUrl || tempData.featuredArticleUrl,
          whyBecomeMentor: updatedData.why_become_mentor || updatedData.whyBecomeMentor || tempData.whyBecomeMentor,
          greatestAchievement: updatedData.greatest_achievement || updatedData.greatestAchievement || tempData.greatestAchievement,
          profile_photo: selectedFile ? (updatedData.profile_photo || profileData.profile_photo) : profileData.profile_photo,
        };
        
        setProfileData(updatedProfileData);
        
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...currentUser,
          ...updatedProfileData,
        };
        
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setIsEditing(false);
      setSelectedFile(null);
      setErrors({});
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
    
    // Real-time validation
    handleFieldValidation(name, value);
  };
  
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image smaller than 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      if (tempData.profile_photo.startsWith('blob:')) {
        URL.revokeObjectURL(tempData.profile_photo);
      }
      
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
    
    if (!photo) return "/default-avatar.png";
    
    if (photo.startsWith('blob:') || photo.startsWith('data:')) {
      return photo;
    }
    
    if (photo && !photo.startsWith('http')) {
      return `http://localhost:2999/uploads/profiles/${photo}`;
    }
    
    return photo || "/default-avatar.png";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black">Mentor Profile</h1>
              <p className="text-black-100 mt-1">Complete your mentor profile to start mentoring</p>
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
              {/* Basic Information */}
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">Basic Information</h2>
              
              <InfoRow 
                label="First Name"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="firstName"
                onChange={handleInputChange}
                required={true}
                error={errors.firstName}
              />
              <InfoRow 
                label="Last Name"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="lastName"
                onChange={handleInputChange}
                required={true}
                error={errors.lastName}
              />
              <InfoRow 
                label="Email"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="email"
                type="email"
                onChange={handleInputChange}
                required={true}
                error={errors.email}
              />

              {/* Professional Information */}
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-blue-500">Professional Information</h2>
              
              <InfoRow 
                label="Job Title"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="jobTitle"
                placeholder="e.g., Senior Developer, Product Manager"
                onChange={handleInputChange}
                required={true}
                error={errors.jobTitle}
              />
              <InfoRow 
                label="Company"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="company"
                placeholder="Where do you work?"
                onChange={handleInputChange}
                required={false}
                error={errors.company}
              />
              <InfoRow 
                label="Location"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="location"
                placeholder="City, Country"
                onChange={handleInputChange}
                required={true}
                error={errors.location}
              />
              <InfoRow 
                label="Category"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="category"
                placeholder="Your expertise area (e.g., Web Development, Data Science)"
                onChange={handleInputChange}
                required={true}
                error={errors.category}
              />
              <InfoRow 
                label="Skills"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="skills"
                placeholder="Comma separated skills (e.g., JavaScript, React, Node.js)"
                onChange={handleInputChange}
                required={true}
                error={errors.skills}
              />
              
              <TextAreaRow 
                label="Bio"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="bio"
                placeholder="Tell us about your experience, expertise, and why you want to mentor..."
                onChange={handleInputChange}
                required={true}
                rows={5}
                error={errors.bio}
              />

              {/* Online Presence */}
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-blue-500">Online Presence</h2>
              
              <InfoRow 
                label="LinkedIn URL"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                onChange={handleInputChange}
                required={true}
                error={errors.linkedinUrl}
              />
              <InfoRow 
                label="Personal Website"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="personalWebsite"
                type="url"
                placeholder="https://yourwebsite.com (optional)"
                onChange={handleInputChange}
                error={errors.personalWebsite}
              />
              <InfoRow 
                label="Introduction Video URL"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="introVideoUrl"
                type="url"
                placeholder="YouTube or Vimeo link (optional)"
                onChange={handleInputChange}
                error={errors.introVideoUrl}
              />
              <InfoRow 
                label="Featured Article URL"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="featuredArticleUrl"
                type="url"
                placeholder="Link to your article or blog post (optional)"
                onChange={handleInputChange}
                error={errors.featuredArticleUrl}
              />

              {/* Mentorship Details */}
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-blue-500">Mentorship Details</h2>
              
              <TextAreaRow 
                label="Why Do You Want to Become a Mentor?"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="whyBecomeMentor"
                placeholder="Share your motivation for mentoring others... (optional)"
                onChange={handleInputChange}
                rows={4}
                error={errors.whyBecomeMentor}
              />
              <TextAreaRow 
                label="Greatest Achievement"
                isEditing={isEditing}
                tempData={tempData}
                profileData={profileData}
                name="greatestAchievement"
                placeholder="What's your proudest professional achievement? (optional)"
                onChange={handleInputChange}
                rows={4}
                error={errors.greatestAchievement}
              />
            </div>

            {/* Errors Display */}
            {Object.keys(errors).length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside text-red-700 text-sm">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}