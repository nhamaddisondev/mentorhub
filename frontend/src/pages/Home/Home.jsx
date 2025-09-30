import React from "react";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  GithubFilled,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              KhMentor helps learners and teams master modern web development
              with practical guides, mentorship, and real-world projects focused
              on React, Vue, Django, and deployment workflows.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Learn faster with hands-on examples, step-by-step roadmaps, and
              tool comparisons tailored for today’s stacks.
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MailOutlined className="text-blue-400" />
                <span>
                  Email:{" "}
                  <a
                    href="mailto:hello@khmentor.dev"
                    className="underline hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    hello@khmentor.dev
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneOutlined className="text-green-400" />
                <span>Phone: +855 12 345 678</span>
              </li>
              <li className="flex items-center gap-2">
                <EnvironmentOutlined className="text-red-400" />
                <span>Location: Phnom Penh, Cambodia</span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded bg-gray-800 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FacebookFilled className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="p-2 rounded bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <TwitterOutlined className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded bg-gray-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <LinkedinFilled className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <GithubFilled className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="p-2 rounded bg-gray-800 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <YoutubeFilled className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="mt-3 text-sm text-gray-300">
              Get tips on React, Vue, Django, DevOps, and deployment best
              practices.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full sm:flex-1 rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-3 text-xs text-gray-400">
              By subscribing, consent is given to receive updates. Unsubscribe
              any time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2025 KhMentor. All rights reserved.
          </p>
          <ul className="flex items-center gap-6 text-sm text-gray-400">
            <li>
              <a
                href="#"
                className="hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
