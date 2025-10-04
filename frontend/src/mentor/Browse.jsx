import React, { useState, useEffect } from "react";
import { X, Star, MapPin, Briefcase, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react';

function Browse() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch mentors data
  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:2999/api/mentors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMentors(data.mentors);
      } else {
        setError(data.message || "Failed to fetch mentors");
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // FIXED: Function to format skills - handles both strings and arrays
  const formatSkills = (skillsInput) => {
    if (!skillsInput) return [];
    
    // If it's already an array, return it
    if (Array.isArray(skillsInput)) {
      return skillsInput;
    }
    
    // If it's a string, split by commas
    if (typeof skillsInput === 'string') {
      return skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    }
    
    // Fallback for any other type
    return [];
  };

  // Function to get profile photo URL
  const getProfilePhotoUrl = (profilePhoto) => {
    if (!profilePhoto) return null;
    
    // If it's already a full URL, return as is
    if (profilePhoto.startsWith('http')) {
      return profilePhoto;
    }
    
    // Otherwise, construct the URL relative to your backend
    return `http://localhost:2999/uploads/profiles/${profilePhoto}`;
  };

  // Handle View Profile click
  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMentor(null);
  };

  // Mentor Profile Modal Component
  const MentorProfileModal = ({ mentor, isOpen, onClose }) => {
    if (!isOpen || !mentor) return null;

    // Prepare mentor data for modal
    const mentorSkills = formatSkills(mentor.skills);
    
    const mentorData = {
      name: `${mentor.first_name} ${mentor.last_name}`,
      title: mentor.job_title || "Professional Mentor",
      profilePhoto: getProfilePhotoUrl(mentor.profile_photo),
      rating: 4.8, 
      reviews: 24,
      responseRate: 95,
      responseTime: "2 hours",
      experience: "5+ years",
      location: mentor.location,
      currentRole: `${mentor.job_title}${mentor.company ? ` at ${mentor.company}` : ''}`,
      expertise: mentor.category ? [mentor.category] : ["Professional Mentoring"],
      specialties: {
        skills: mentorSkills.slice(0, 8)
      },
      bio: mentor.bio,
      mentorshipStyle: [
        "Personalized guidance",
        "Career strategy planning",
        "Skill development",
        "Professional growth"
      ],
      availability: {
        sessionsPerWeek: "3-5",
        sessionDurations: ["30min", "60min"],
        preferredTimes: "Flexible schedule"
      },
      stats: {
        sessionsCompleted: 10,
        studentsMentored: 15
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Mentor Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
              {/* Left Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Profile Header */}
                <div className="text-center">
                  {mentorData.profilePhoto ? (
                    <img
                      src={mentorData.profilePhoto}
                      alt={mentorData.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100 bg-blue-100 flex items-center justify-center ${mentorData.profilePhoto ? 'hidden' : 'flex'}`}>
                    <span className="text-2xl font-bold text-blue-600">
                      {mentor.first_name?.[0]}{mentor.last_name?.[0]}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900">{mentorData.name}</h3>
                  <p className="text-blue-600 font-medium">{mentorData.title}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= Math.floor(mentorData.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {mentorData.rating} ({mentorData.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="font-semibold text-gray-900">{mentorData.responseRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="font-semibold text-gray-900">{mentorData.responseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">{mentorData.experience}</span>
                  </div>
                </div>

                {/* Achievement Stats */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{mentorData.stats.sessionsCompleted}+</div>
                      <div className="text-xs text-gray-500">Sessions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{mentorData.stats.studentsMentored}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Calendar size={20} />
                    Book Session
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    Send Message
                  </button>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Expertise & Location */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentorData.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{mentorData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase size={16} />
                    <span>{mentorData.currentRole}</span>
                  </div>
                </div>

                {/* Bio */}
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">About Me</h4>
                  <p className="text-gray-700 leading-relaxed">{mentorData.bio}</p>
                </section>

                {/* Skills */}
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentorData.specialties.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Mentorship Style */}
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Mentorship Approach</h4>
                  <div className="space-y-2">
                    {mentorData.mentorshipStyle.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Availability */}
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Availability</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-600" />
                        <div>
                          <div className="font-medium">Sessions per week</div>
                          <div className="text-gray-600">{mentorData.availability.sessionsPerWeek}</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Session Duration</div>
                        <div className="text-gray-600">{mentorData.availability.sessionDurations.join(', ')}</div>
                      </div>
                      <div>
                        <div className="font-medium">Preferred Times</div>
                        <div className="text-gray-600">{mentorData.availability.preferredTimes}</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchMentors}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="BrowseMentors min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Browse Mentors</h1>
        <p className="text-lg text-gray-700 mb-8">
          Find the perfect mentor to guide you on your journey. 
          {mentors.length > 0 && ` Showing ${mentors.length} mentors`}
        </p>

        {/* Mentor listing grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600">No mentors found</h3>
              <p className="text-gray-500">Be the first to sign up as a mentor!</p>
            </div>
          ) : (
            mentors.map((mentor) => {
              const profilePhotoUrl = getProfilePhotoUrl(mentor.profile_photo);
              const mentorSkills = formatSkills(mentor.skills); // FIXED: Use the safe function
              
              return (
                <div key={mentor._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <div className="flex items-center mb-4">
                    {/* Profile Photo */}
                    {profilePhotoUrl ? (
                      <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                        <img 
                          src={profilePhotoUrl} 
                          alt={`${mentor.first_name} ${mentor.last_name}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            // Fallback to initial avatar if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center hidden">
                          <span className="text-2xl font-bold text-blue-600">
                            {mentor.first_name[0]}{mentor.last_name[0]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {mentor.first_name[0]}{mentor.last_name[0]}                          
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <h2 className="text-xl font-semibold">
                        {mentor.first_name} {mentor.last_name}
                      </h2>
                      <p className="text-gray-500">
                        {mentor.job_title}
                        {mentor.company && ` at ${mentor.company}`}
                      </p>
                      {mentor.location && (
                        <p className="text-gray-400 text-sm">{mentor.location}</p>
                      )}
                      {mentor.category && (
                        <p className="text-blue-600 text-sm font-medium">{mentor.category}</p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {mentor.bio || "No bio available."}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentorSkills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                    {mentorSkills.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        +{mentorSkills.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleViewProfile(mentor)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    View Profile
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Mentor Profile Modal */}
      <MentorProfileModal 
        mentor={selectedMentor} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default Browse;