import React from "react";
import { Link } from "react-router-dom";

function Navbar({ handleClick }) {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white">
                    <h2 className="text-lg font-bold">Welcome</h2>
                </div>

                <ul className="flex space-x-4">
                    <li className="text-white" onClick={() => handleClick(true)}>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            View Product
                        </button>
                    </li>
                    <li>
                        <Link to="/seller">
                            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

