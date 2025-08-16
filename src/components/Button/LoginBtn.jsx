import React from "react";
import { Link } from "react-router-dom";
function LoginBtn() {
    return (
        <Link to="/auth/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Login
            </button>
        </Link>
    );
}
export default LoginBtn;