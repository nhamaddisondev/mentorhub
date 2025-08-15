import React, { useState } from "react";
import { Link } from "react-router-dom";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the email to your backend for password reset
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Password reset form */}
      <div className="flex flex-col justify-center w-full md:w-2/3 p-10 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Reset Password
        </h1>
        <div className="max-w-sm mx-auto w-full">
          {submitted ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Check your email</h3>
              <p className="text-gray-600 mb-4">If an account exists for {email}, you will receive a password reset link shortly.</p>
              <Link to="/auth/login" className="text-blue-600 hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form className="space-y-5 max-w-sm mx-auto w-full bg-white" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1 text-base text-left" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-base"
              >
                Send Reset Link
              </button>
              <div className="text-sm mt-5 text-center">
                <Link to="/auth/login" className="text-blue-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="hidden md:flex w-1/3 bg-blue-900 items-center justify-center">
        <img
          src="/your-logo.png" // replace with your actual logo path
          alt="Logo"
          className="h-16 w-16 object-contain"
        />
      </div>
    </div>
  );
}

export default PasswordReset;
