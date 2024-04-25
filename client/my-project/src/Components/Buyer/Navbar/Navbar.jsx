import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="bg-gray-800 py-2">
            <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
                {/* Logo */}
                <div className="flex items-center justify-between">
                    <div className="text-white text-lg font-bold">My App</div>

                   
                </div>

                {/* Navigation Links */}
                <ul className="md:flex hidden space-x-4 text-white">
                    <li>
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
                    </li>
                    <li> My Cart</li>
                </ul>

                {/* Search Input */}
                <div className="md:flex items-center mt-2 md:mt-0">
                    <input
                        type="search"
                        placeholder="Search for Products"
                        className="bg-white text-gray-800 px-3 py-1 rounded-lg focus:outline-none w-full md:w-auto"
                    />
                </div>
            </div>

            {/* Mobile Menu (hidden by default) */}
            <div className="md:hidden mt-2 flex flex-col items-center">
                <Link to="/" className="text-white hover:text-gray-300 py-1">Home</Link>
                <Link to="/signin" className="text-white hover:text-gray-300 py-1">Sign In</Link>
            </div>
            
        </nav>
    );
}

export default Navbar;

