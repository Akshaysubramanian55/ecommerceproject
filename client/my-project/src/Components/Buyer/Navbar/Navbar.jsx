import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo (You can replace with your own logo/image) */}
                    <div className="text-white text-xl font-bold">My App</div>

                    {/* Navigation Links */}
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-white hover:text-gray-300">Products</Link>
                        </li>
                        <li>
                            <Link to="/signin" className="text-white hover:text-gray-300">Sign In</Link>
                        </li>
                    </ul>

                    {/* Search Input */}
                    <input
                        type="search"
                        placeholder="Search for Products"
                        className="bg-white text-gray-800 px-3 py-2 rounded-lg focus:outline-none"
                        style={{ maxWidth: "250px" }} // Limiting input width for responsiveness
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;