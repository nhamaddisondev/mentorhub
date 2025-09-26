
import React, { useState } from "react";
// Sample mentor data
const mentorsData = [
  {
    name: "John Smith",
    title: "Software Engineer",
    skills: ["JavaScript", "React"],
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sarah Lee",
    title: "UX Designer",
    skills: ["UI/UX", "Figma"],
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Brown",
    title: "Business Coach",
    skills: ["Leadership", "Marketing"],
    img: "https://randomuser.me/api/portraits/men/78.jpg"
  }
];

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter mentors based on search input
  const filteredMentors = mentorsData.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Find a Mentor</h2>
          <p className="text-lg mb-8">Search and connect with mentors who can help you grow.</p>
          <div className="flex flex-col md:flex-row max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search by skill, name, or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-3 outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700">Search</button>
          </div>
        </div>
      </section>

      {/* Mentor Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8 text-center">Mentor Results</h3>
        <div className="grid gap-8 md:grid-cols-3">
          {filteredMentors.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500">No mentors found.</p>
          ) : (
            filteredMentors.map((mentor, idx) => (
              <div key={idx} className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                <img src={mentor.img} alt={mentor.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h4 className="text-lg font-bold">{mentor.name}</h4>
                <p className="text-gray-600">{mentor.title}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  {mentor.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View Profile</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
export default FindMentor;