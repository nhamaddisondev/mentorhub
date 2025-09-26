import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupMentee() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear confirm password error when passwords match
    if ((name === "password" || name === "confirmPassword") && form.password === form.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (form.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (form.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const response = await fetch("http://localhost:2999/api/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          email: form.email.toLowerCase().trim(),
          password: form.password,
          role: "mentee",
        }),
      });
      
      const text = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", text);
      
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error(`Invalid JSON response: ${text}`);
      }
      
      if (response.ok) {
        if (data.message === "User created successfully") {
          setSubmitted(true);
          setTimeout(() => navigate("/auth/login"), 3000);
        } else {
          setErrors({ submit: data.message || "Signup completed but with unexpected response" });
        }
      } else {
        setErrors({ submit: data.message || `Server error: ${response.status}` });
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ submit: error.message.includes("JSON") ? "Server returned invalid response" : `Network error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the same JSX return section)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Sign up as a Mentee
          </h1>
          <p className="text-center text-gray-600">
            Join our community and find the perfect mentor
          </p>
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">
            {errors.submit}
          </div>
        )}

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Thank you for signing up!</h3>
            <p className="text-gray-600 mb-4">You will be redirected to login shortly.</p>
            <Link 
              to="/auth/login" 
              className="text-blue-600 hover:underline font-medium"
            >
              Go to Login Now
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ... keep all your existing JSX form elements ... */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-1 text-left">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 text-left">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-1 text-left">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 text-left">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1 text-left">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1 text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="At least 6 characters"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 text-left">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 text-left">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 text-left">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Sign Up"}
            </button>
            
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignupMentee;