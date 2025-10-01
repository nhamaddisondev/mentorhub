import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBtn from "../../components/Button/SearchBtn.jsx";
import StudentLearning from "../../assets/istockphoto-1581045672-612x612.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function Home() {
  // Get token and user info from localStorage (safe parse)
  const token = localStorage.getItem("token") || "";
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const email = user?.email || "";
  const role = user?.role || "";

  const getUsername = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };
  const username = getUsername(email);

  // Contact form local state
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    try {
      // TODO: Replace with actual API call, e.g.:
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // const data = await res.json();
      await new Promise((r) => setTimeout(r, 600)); // simulate
      setStatus({
        type: "success",
        message: "Message sent successfully. We'll get back soon!",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  // Logged-in view (mentee)
  if (token && role === "mentee") {
    return (
      <div className="Home bg-blue-50 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome, {username}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          Start connecting with mentors and get ready to take your career to the
          next level!
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

  // Logged-in view (mentor)
  if (token && role === "mentor") {
    return (
      <div className="Home bg-blue-50 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome, {username}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          As a mentor, there’s an opportunity to guide and inspire the next
          generation of talent.
        </p>
      </div>
    );
  }

  // Logged-out view (hero + about + contact)
  return (
    <div className="Home bg-white min-h-screen">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center">
          <div className="flex-1">
            <p className="text-base md:text-lg text-gray-600 mb-3 font-semibold">
              Learn a new skill, launch a project, land a dream career.
            </p>

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
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            <div className="mb-8 mx-auto" style={{ maxWidth: 520 }}>
              <SearchBtn />
            </div>

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

        {/* Steps */}
        <motion.div
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">1. Find a Mentor</h3>
            <p>
              Browse profiles, skills, and reviews to find the perfect fit for
              specific goals.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">2. Book a Session</h3>
            <p>Schedule a 1-on-1 video call at a convenient time.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">3. Start Growing</h3>
            <p>
              Get personalized guidance and actionable advice to accelerate a
              career.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.article variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About KhMentor
              </h2>
              <p className="text-gray-700 leading-7 mb-4">
                KhMentor is a mentorship platform built to connect learners with
                experienced mentors across web development, data, and DevOps
                disciplines. The focus is on practical, project-based growth
                guided by real industry experience.
              </p>
              <p className="text-gray-700 leading-7 mb-4">
                From code reviews and career roadmaps to mock interviews,
                mentors provide actionable feedback and personalized plans.
                Progress is tracked with measurable outcomes so that each
                session drives tangible improvement.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Hands-on projects and portfolio guidance</li>
                <li>Clear roadmaps tailored to current level</li>
                <li>Tooling support: React, Vue, Django, Cloud, CI/CD</li>
              </ul>

              <div className="mt-6">
                <Link
                  to="/mentor/browse"
                  className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Explore Mentors
                </Link>
              </div>
            </motion.article>

            <motion.div
              variants={itemVariants}
              className="p-6 border rounded-lg bg-white shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3">Why choose us?</h3>
              <p className="text-gray-700 mb-2">
                Mentors are vetted for both technical skill and coaching
                ability, ensuring guidance that’s accurate, empathetic, and
                aligned with goals.
              </p>
              <p className="text-gray-700">
                Sessions emphasize clarity and momentum—short feedback loops,
                practical checklists, and realistic milestones that fit a busy
                schedule.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Student Review */}
<section className="py-16 bg-white">
  <motion.div
    className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center"
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
  >
    {/* Left: photo frame */}
    <motion.div className="relative" variants={itemVariants}>
      <motion.div
        className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
        whileHover={{ scale: 1.02, rotate: -0.4 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        <img
          src={StudentLearning}   // <-- use the imported variable (no quotes)
          alt="Student studying with laptop"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* soft glow accent behind the frame */}
      <motion.div
        className="absolute -bottom-6 -left-6 h-28 w-40 rounded-3xl blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(120px 80px at 60% 50%, rgba(59,130,246,.35), rgba(59,130,246,0))",
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>

    {/* Right: text + testimonial card */}
    <motion.div variants={itemVariants}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        Real Learning, Real Results
      </motion.h2>

      <motion.p
        className="text-gray-600 leading-7 mb-8"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        The mentorship program is designed to help students focus and achieve goals through personalized guidance and support.
      </motion.p>

      {/* Testimonial card */}
      <motion.div
        className="relative rounded-2xl bg-white border border-blue-100 shadow-[0_12px_30px_rgba(37,99,235,0.08)] p-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* decorative quote mark */}
        <motion.div
          className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-blue-500 text-white grid place-items-center shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
        >
          <span className="text-2xl leading-none">“</span>
        </motion.div>

        <p className="text-gray-700 italic mb-6">
          The structured approach to mentorship helped me stay focused and make real progress toward my goals. My mentor provided exactly the guidance I needed.
        </p>

        <div className="flex items-center gap-3">
          <motion.div
            className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white grid place-items-center font-semibold"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.08 }}
          >
            S
          </motion.div>
          <div>
            <p className="font-semibold text-gray-900">Sarah K.</p>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        {/* corner accent bubble */}
        <motion.span
          className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-blue-400/70"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  </motion.div>
</section>


      {/* Contact Us */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="p-6 md:p-8 border rounded-lg bg-white"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
            >
              Contact Us
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 mb-6">
              Questions, feedback, or partnership ideas? Send a message and a
              reply will be provided shortly.
            </motion.p>

            {status.message && (
              <div
                className={`mb-4 text-sm rounded px-3 py-2 ${status.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                role="alert"
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write the message..."
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-white text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
