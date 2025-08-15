import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("mentee");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${role}: ${form.username}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="flex flex-col justify-center w-full md:w-2/3 p-10 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Log in
        </h1>
        {/* Tabs */}
        <div className="max-w-sm mx-auto w-full">
          <div className="flex border-b-0 mb-0 justify-center">
            <button
              className={`px-5 py-2 border-b-2 text-base font-semibold ${
                role === "mentee"
                  ? "border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("mentee")}
              type="button"
            >
              I'm a mentee
            </button>
            <button
              className={`px-5 py-2 text-base font-semibold ${
                role === "mentor"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("mentor")}
              type="button"
            >
              I'm a mentor
            </button>
          </div>
          <hr className="border-gray-300 my-2" />
        </div>

        {/* Form */}
        <form
          className="space-y-5 max-w-sm mx-auto w-full bg-white"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 mb-1 text-base text-left">
              Email or username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-base text-left">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-base"
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center my-5 w-full">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 text-base"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-5 w-5 mr-2"
              alt="Google logo"
            />
            Log in with Google
          </button>

          {/* Forgot password */}
          <div className="text-sm mt-5 text-center">
            <Link
              to="/auth/password_reset"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign up */}
          <p className="text-sm mt-3 text-gray-600 text-center">
            Don’t have an account? <br />
            <Link to="/auth/Signup" className="text-blue-600 hover:underline">
              Sign up as a mentee
            </Link>{" "}
            or{" "}
            <Link to="/mentor/" className="text-blue-600 hover:underline">
              apply to be a mentor
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-1/3 bg-blue-900 items-center justify-center">
        <img
          src="/your-logo.png" 
          alt="Logo"
          className="h-16 w-16 object-contain"
        />
      </div>
    </div>
  );
}

export default Login;
