import React from "react";
import { Link } from "react-router-dom";

function Navbar({ handleClick }) {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white">
                    <h2 className="text-lg font-bold">Welcome</h2>
                </div>

                <div className="block lg:hidden">
                    {/* Hamburger icon for mobile */}
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => handleClick(true)}
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                            />
                        </svg>
                    </button>
                </div>

                <ul className="hidden lg:flex lg:space-x-4">
                    <li className="text-white">
                        <button
                            onClick={() => handleClick(true)}
                            className="mt-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            View Product
                        </button>
                    </li>
                    <li>
                        <Link to="/seller">
                            <button
                                className="mt-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Product
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
