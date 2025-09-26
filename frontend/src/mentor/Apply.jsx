import { useState } from "react";
import Header from "../components/Navbar/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function MentorForm() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    company: "",
    location: "",
    category: "",
    skills: "",
    bio: "",
    linkedin: "",
    website: "",
    introVideo: "",
    featuredArticle: "",
    reason: "",
    achievement: ""
  });

  const [errors, setErrors] = useState({});

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
  const newErrors = {};
  if (!photo) newErrors.photo = "This field is required.";
  if (!formData.firstName) newErrors.firstName = "This field is required.";
  if (!formData.lastName) newErrors.lastName = "This field is required.";
  if (!formData.email) newErrors.email = "This field is required.";
  if (!formData.password) {
    newErrors.password = "This field is required.";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters long.";
  }
  if (!formData.jobTitle) newErrors.jobTitle = "This field is required."; 
  if (!formData.location) newErrors.location = "This field is required.";
  return newErrors;
};

const validateStep2 = () => {
  const newErrors = {};
  if (!formData.category) newErrors.category = "This field is required.";
  if (!formData.skills) newErrors.skills = "This field is required.";
  if (!formData.bio) newErrors.bio = "This field is required.";
  if (!formData.linkedin) {
    newErrors.linkedin = "This field is required.";
  } else {
    // LinkedIn URL validation regex (same as backend)
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
    if (!linkedinRegex.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)";
    }
  }
  return newErrors;
};

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form Data:", formData);
  //logic
  fetch("http://localhost:2999/api/mentor-signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: "mentor", 
      job_title: formData.jobTitle,
      company: formData.company ?? null,
      location: formData.location,
      category: formData.category,
      skills: formData.skills,
      bio: formData.bio,
      linkedin_url: formData.linkedin,
      personal_website: formData.website ?? null,
      intro_video_url: formData.introVideo ?? null,
      featured_article_url: formData.featuredArticle ?? null,
      why_become_mentor: formData.reason ?? null,
      greatest_achievement: formData.achievement ?? null,
    }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "../../auth/login";
          alert("Application submitted successfully!");
        } else {
          alert(`Submission failed: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Submission failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex flex-col items-center p-4 md:p-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12 w-full max-w-2xl">
          <div className="flex items-center w-full justify-between relative">
            {['About you', 'Profile', 'Experience'].map((label, index) => (
              <div key={index} className="flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow-xl text-white text-lg font-bold transition-all duration-300 border-4 ${
                    step > index ? 'bg-green-500 border-green-300' : step === index + 1 ? 'bg-blue-600 border-blue-300 scale-110' : 'bg-gray-300 border-gray-200'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`mt-3 text-base font-semibold transition-colors duration-300 tracking-wide ${
                  step > index ? 'text-green-600' : step === index + 1 ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>
            ))}
            <div className="absolute top-7 left-12 right-12 h-2 bg-gray-200 z-0 rounded-full"></div>
            <div
              className="absolute top-7 left-12 h-2 bg-gradient-to-r from-blue-400 to-green-400 z-0 transition-all duration-300 rounded-full shadow"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full max-w-2xl space-y-6">
          {/* Info Box */}
          {step === 1 && (
            <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded text-sm leading-relaxed">
              <strong className="block mb-1">Lovely to see you!</strong> 
              Filling out the form only takes a couple minutes. We'd love to learn more about your background and 
              the ins-and-outs of why you'd like to become a mentor. Keep things personal and talk directly to us 
              and your mentees. We don't need jargon and polished cover letters here!
              <br /><br />
              You agree to our code of conduct and the mentor agreement by sending the form, so be sure to have a look at those.
            </div>
          )}

          {step === 3 && (
            <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded text-sm leading-relaxed">
              <strong>Almost there!</strong> You're just one last step away from being a mentor and 
              connecting with mentees all over the world. Show off your accomplishments and how you 
              can help others. Many of these fields are optional but will help us get better insights 
              into your work — and therefore increase your chances.
            </div>
          )}

          {/* Step 1: About you */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-gray-200">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <label className="mt-3 px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Upload Photo
                  <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                </label>
                {errors.photo && <div className="text-red-500 text-sm mt-2">{errors.photo}</div>}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
                  </div>
                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
                  </div>
                </div>
                  {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                  </div>
                      {/* Job Title */}
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
                    <input
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.jobTitle && <div className="text-red-500 text-sm mt-1">{errors.jobTitle}</div>}
                  </div>
                  
                </div>
                  {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your location</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                  {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                </div>
              </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm float-right ml-auto block"
                style={{ minWidth: '100px' }}
              >
                Next
              </button>
            </form>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Please select...</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                  </select>
                  {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Add a new skill..."
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.skills && <div className="text-red-500 text-sm mt-1">{errors.skills}</div>}
                  <p className="text-xs text-gray-500 mt-1">
                    Describe your expertise to connect with mentees who have similar interests.
                    <br/>
                    Comma-separated list of your skills (keep it below 10). Mentees will use this to find you.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="5"
                  ></textarea>
                  {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio}</div>}
                  <p className="text-xs text-gray-500 mt-1">
                    Tell us (and your mentees) a little bit about yourself. Talk about yourself in the first person, 
                    as if you'd directly talk to a mentee. This will be public.
                  </p>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  type="url"
                  placeholder="https://linkedin.com/in/yourusername"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.linkedin && <div className="text-red-500 text-sm mt-1">{errors.linkedin}</div>}
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website (optional)</label>
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    type="url"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">You can add your blog, GitHub profile or similar here</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Previous step
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next step
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intro Video (optional)</label>
                  <input
                    name="introVideo"
                    value={formData.introVideo}
                    onChange={handleChange}
                    placeholder="https://your-intro-video-URL"
                    type="url"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Add a YouTube video or record a Loom for your future mentees</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Article (optional)</label>
                  <input
                    name="featuredArticle"
                    value={formData.featuredArticle}
                    onChange={handleChange}
                    placeholder="https://your-blog-article-URL"
                    type="url"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Link an interview / podcast / piece of writing you are proud of or were featured in</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why do you want to become a mentor? <span className="text-gray-500">(Not publicly visible)</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What, in your opinion, has been your greatest achievement so far? <span className="text-gray-500">(Not publicly visible)</span>
                  </label>
                  <textarea
                    name="achievement"
                    value={formData.achievement}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Previous step
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit application
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
