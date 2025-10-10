import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MentorProfile() {
  const { userId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMentor = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:2999/api/mentors/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMentor(data.mentor);
      } else {
        setError(data.message || "Failed to fetch mentor profile");
      }
    } catch (error) {
      console.error("Error fetching mentor:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/" className="text-blue-400 underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white text-black rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center p-8 bg-blue-700 text-white">
          <img
            src="https://via.placeholder.com/150"
            alt={`${mentor.first_name} ${mentor.last_name}`}
            className="w-32 h-32 rounded-full border-4 border-white object-cover mb-4 md:mb-0 md:mr-8"
          />
          <div className="text-center md:text-left flex-1">
            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              Top Mentor
            </span>
            <h1 className="text-3xl font-bold mt-3">
              {mentor.first_name} {mentor.last_name}
            </h1>
            <p className="mt-1 text-lg">
              {mentor.job_title} {mentor.company && `@ ${mentor.company}`}
            </p>
            <div className="flex flex-wrap mt-3 gap-3 text-gray-200 text-sm">
              <p>🌍 {mentor.location}</p>
              <p>⏱ Active today</p>
              <p>⌛ Responds within 12 hrs</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {mentor.skills &&
              mentor.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium bg-blue-600 text-white shadow-sm"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {/* Bio */}
        {mentor.bio && (
          <div className="p-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">About</h2>
            <p className="text-gray-800 leading-relaxed">{mentor.bio}</p>
          </div>
        )}

        {/* Actions */}
        <div className="p-8 border-t border-gray-200 flex flex-col md:flex-row gap-4 justify-center">
          {mentor.linkedin_url && (
            <a
              href={mentor.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition w-full md:w-auto text-center"
            >
              LinkedIn
            </a>
          )}
          {mentor.personal_website && (
            <a
              href={mentor.personal_website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition w-full md:w-auto text-center"
            >
              Website
            </a>
          )}

          <button className="px-5 py-3 rounded-xl font-semibold transition w-full md:w-auto bg-yellow-500 text-black hover:bg-yellow-400">
            Save
          </button>

          <Link
            to={`/book/${mentor.id}`}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-500 transition w-full md:w-auto text-center"
          >
            Book Mentor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
