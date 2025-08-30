import React from "react";
import { Typewriter } from "react-simple-typewriter";
import SearchBtn from "../../components/Button/SearchBtn.jsx";

function Home() {
  return (
    <div className="Home">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center">
          {/* Left side image */}
          {/* <div className="flex-1 mb-8 md:mb-0">
            <img
              src="/mentor-hero.png"
              alt="Mentorship"
              className="w-full h-auto object-contain"
            />
          </div> */}

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
                  words={[
                    "Mentorship",
                    "Coaching",
                    "Guidance",
                    "Support",
                    "Career Growth",
                  ]}
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

            {/* Category pills */}  
            <div className="flex flex-wrap justify-center gap-3 text-base">
              {[
                // "Product Managers",
                // "Career Coaches",
                // "Software Engineers",
                // "Leadership Mentors",
                // "UX Designers",
                // "Data Scientists",
                // "Startup Founders",
              ].map((category, idx) => (
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
