import React from "react";
import Header from "../../components/Navbar/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";

function Mentor() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-black-700 mb-4">Share your expertise, grow, and make a difference</h1>
        {/* <p className="text-lg text-gray-700">Mentoring is a two-way street. Let us take care of the boring parts so you can <br /> concentrate on personal and professional growth for both you and your mentees.</p> */}
        <Link
          to="/mentor/apply"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
        >
          Become a mentor
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Mentor;
