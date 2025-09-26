import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import SearchBtn from "../../components/Button/SearchBtn.jsx";

function Home() {
// Get token and user info from localStorage
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const email = user?.email || "";
const role = user?.role || "";

const getUsername = (email) => {
  if (!email) return "User";
  return email.split('@')[0];
};
  const username = getUsername(email);

  // Logged-in view
  if (token && role === "mentee") {
    return (
      <div className="Home bg-blue-50 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome, {username}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          Start connecting with mentors and get ready to take your career to the next level!
        </p>
        <Link
          to="/mentor/browse"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Browse Mentors
        </Link>
      </div>      
    );
  }
  
  if (token && role === "mentor") {
    return (
      <div className="Home bg-blue-50 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome, {username}!</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          As a mentor, you have the opportunity to guide and inspire the next generation of talent.
        </p>
      </div>
    );
  }

  // Logged-out view (original hero section)
  return (
    <div className="Home bg-white min-h-screen">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center">
          {/* Right side content */}
          <div className="flex-1">
            <p className="text-base md:text-lg text-gray-600 mb-3 font-semibold">
              Learn a new skill, launch a project, land your dream career.
            </p>

            {/* Heading with Typewriter */}
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-8"
              id="hero-title"
            >
              1-on-1{" "}
              <span className="text-blue-600">
                <Typewriter
                  words={["Mentorship", "Coaching", "Guidance", "Support", "Career Growth"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            {/* Search bar */}
            <div className="mb-8 mx-auto" style={{ maxWidth: 520 }}>
              <SearchBtn />
            </div>

            {/* Category pills (optional, currently empty) */}
            <div className="flex flex-wrap justify-center gap-3 text-base">
              {[].map((category, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
