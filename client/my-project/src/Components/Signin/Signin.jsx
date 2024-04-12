import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {

    const [role, setRole] = useState(""); // State to hold the selected role


    const handleRoleChange = (e) => {
        setRole(e.target.value); // Update the selected role when dropdown value changes
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-2xl mb-4 font-bold text-center text-gray-800">Sign In</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email" 
                        id="email" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password" 
                        id="password" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                            Select Your Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="input-field"
                        >
                            <option value="">Select...</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                <div className="flex items-center justify-center">
                    <button 
                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an account? 
                    <Link to="/signup" className="text-pink-500 hover:text-pink-700 text-sm font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;


