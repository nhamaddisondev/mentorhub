import React, { useState, useEffect } from "react";

function Browse() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Function to format skills string into array
  const formatSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString.split(',').map(skill => skill.trim());
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
            mentors.map((mentor) => (
              <div key={mentor._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {mentor.first_name?.[0]}{mentor.last_name?.[0]}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {mentor.first_name} {mentor.last_name}
                    </h2>
                    <p className="text-gray-500">
                      {mentor.job_title || "Professional Mentor"}
                      {mentor.company && ` at ${mentor.company}`}
                    </p>
                    {mentor.location && (
                      <p className="text-gray-400 text-sm">{mentor.location}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {mentor.bio || "Experienced professional passionate about mentoring and helping others grow."}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.skills && formatSkills(mentor.skills).slice(0, 4).map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {(!mentor.skills || formatSkills(mentor.skills).length === 0) && (
                    <>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Mentorship</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Coaching</span>
                    </>
                  )}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  View Profile
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;