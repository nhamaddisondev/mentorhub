import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		// Here you would send form data to your backend
	};

	return (
		<div className="min-h-screen flex">
			<div className="flex flex-col justify-center w-full md:w-2/3 p-10 bg-white shadow-lg">
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
					Sign up as a Mentee
				</h1>
				{submitted ? (
					<div className="text-center">
						<h3 className="text-xl font-semibold mb-2">Thank you for signing up!</h3>
						<p className="text-gray-600">Your account has been created. You can now log in.</p>
						<Link to="/auth/login" className="text-blue-600 hover:underline mt-4 inline-block">Go to Login</Link>
					</div>
				) : (
					<form className="space-y-5 max-w-sm mx-auto w-full bg-white" onSubmit={handleSubmit}>
						<div>
							<label className="block text-gray-700 mb-1 text-base text-left" htmlFor="name">Full Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={form.name}
								onChange={handleChange}
								required
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1 text-base text-left" htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								required
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1 text-base text-left" htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								required
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1 text-base text-left" htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={form.confirmPassword}
								onChange={handleChange}
								required
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-base"
						>
							Sign Up
						</button>
						<p className="text-sm mt-3 text-gray-600 text-center">
							Already have an account?{' '}
							<Link to="/auth/login" className="text-blue-600 hover:underline">Log in</Link>
						</p>
					</form>
				)}
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

export default Signup;
	