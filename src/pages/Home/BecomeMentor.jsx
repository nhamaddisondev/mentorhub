import React, { useState } from "react";

const BecomeMentor = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		expertise: "",
		bio: ""
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
		<div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
				<h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Become a Mentor</h2>
				{submitted ? (
					<div className="text-center">
						<h3 className="text-xl font-semibold mb-2">Thank you for applying!</h3>
						<p className="text-gray-600">We will review your application and get in touch soon.</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={form.name}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1" htmlFor="expertise">Area of Expertise</label>
							<input
								type="text"
								id="expertise"
								name="expertise"
								value={form.expertise}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1" htmlFor="bio">Short Bio</label>
							<textarea
								id="bio"
								name="bio"
								value={form.bio}
								onChange={handleChange}
								required
								rows={4}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
						>
							Submit Application
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default BecomeMentor;
