import React from "react";
import { FacebookFilled, TwitterSquareFilled, LinkedinFilled } from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2025 MentorConnect. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 text-2xl"
          >
            <FacebookFilled />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 text-2xl"
          >
            <TwitterSquareFilled />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 text-2xl"
          >
            <LinkedinFilled />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
