import { useState, useEffect } from "react";
import Header from "../components/Navbar/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { validateStep1, validateStep2, validateField, isStepValid } from "../utils/validation/mentor/mentorFormValidationUtils";

export default function MentorForm() {
  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    company: "",
    jobTitle: "",
    email: "",
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

  // Photo Handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      // Validate photo in real-time
      handleFieldValidation('photo', file);
    }
  };

  // Cleanup photo preview URL
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target; // value = what the user typed
    setFormData(prev => ({ ...prev, [name]: value })); // setFormData updates the state (formData)
    
    // Real-time validation
    handleFieldValidation(name, value);
  };

  // Real-time field validation
  const handleFieldValidation = (name, value) => {
  // Use the updated formData by creating a temporary copy
  const updatedFormData = {
    ...formData,
    [name]: value
  };
  
  const fieldErrors = validateField(name, value, updatedFormData, photoFile, errors);
  setErrors(fieldErrors);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1(formData, photoFile);
    setErrors(validationErrors);

    if (isStepValid(validationErrors, 1)) {
      nextStep();
    } else {
      alert('Please complete all required fields marked with * and ensure all information is correct before proceeding.');
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep2(formData);
    setErrors(validationErrors);
    
    if (isStepValid(validationErrors, 2)) {
      nextStep();
    } else {
      alert('Please complete all required fields marked with * and ensure all information is correct before proceeding.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      role: "mentor", 
      company: formData.company || '',
      job_title: formData.jobTitle,
      email: formData.email,
      location: formData.location,
      category: formData.category,
      skills: formData.skills,
      bio: formData.bio,
      linkedin_url: formData.linkedin,
      personal_website: formData.website || '',
      intro_video_url: formData.introVideo || '',
      featured_article_url: formData.featuredArticle || '',
      why_become_mentor: formData.reason || '',
      greatest_achievement: formData.achievement || '',
    };

    // Use FormData to handle file upload
    const formDataObj = new FormData();
    formDataObj.append('mentorData', JSON.stringify(data));
    
    // Append photo if it exists
    if (photoFile) {
      formDataObj.append('photo', photoFile);
    }

    fetch("http://localhost:2999/api/mentor-signup", {
      method: "POST",
      body: formDataObj,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Application submitted successfully!");
        window.location.href = "../../auth/login";
      } else {
        alert(`Submission failed: ${data.message}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Submission failed. Please try again.");
    });
  };

  // ... (rest of your JSX remains exactly the same)
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
                  {photoPreview ? (
                    <img
                      src={photoPreview}
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
                      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
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
                      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
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
                      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      minLength="6"
                      onBlur={() => handleFieldValidation('confirmPassword', formData.confirmPassword)} 
                      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1 text-left">{errors.confirmPassword}</p>
                    )}
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
                      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.jobTitle && <div className="text-red-500 text-sm mt-1">{errors.jobTitle}</div>}
                  </div>
                </div>
                <div>
                  {/* Email & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select your location</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="India">India</option>
                      </select>
                      {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                    </div>
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
                    className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                  {/* Technology & IT */}
                  <optgroup label="Technology & IT">
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Game Development">Game Development</option>
                  </optgroup>

                  {/* Business & Management */}
                  <optgroup label="Business & Management">
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Startups">Startups</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Business Strategy">Business Strategy</option>
                    <option value="Finance">Finance</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Investment">Investment</option>
                  </optgroup>

                  {/* Design & Creative */}
                  <optgroup label="Design & Creative">
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Motion Design">Motion Design</option>
                    <option value="Brand Design">Brand Design</option>
                  </optgroup>

                  {/* Marketing & Sales */}
                  <optgroup label="Marketing & Sales">
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Content Marketing">Content Marketing</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="SEO/SEM">SEO/SEM</option>
                    <option value="Sales">Sales</option>
                    <option value="Business Development">Business Development</option>
                  </optgroup>

                  {/* Career & Personal Development */}
                  <optgroup label="Career & Personal Development">
                    <option value="Career Development">Career Development</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Public Speaking">Public Speaking</option>
                    <option value="Interview Preparation">Interview Preparation</option>
                    <option value="Resume Writing">Resume Writing</option>
                  </optgroup>

                  {/* Other Industries */}
                  <optgroup label="Other Industries">
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Legal">Legal</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Non-profit">Non-profit</option>
                    <option value="Government">Government</option>
                    <option value="Other">Other</option>
                  </optgroup>
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
                    className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.skills ? 'border-red-500' : 'border-gray-300'
                    }`}
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
                    className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.bio ? 'border-red-500' : 'border-gray-300'
                    }`}
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
                    className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.linkedin ? 'border-red-500' : 'border-gray-300'
                    }`}
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
                    className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.website ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.website && <div className="text-red-500 text-sm mt-1">{errors.website}</div>}
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