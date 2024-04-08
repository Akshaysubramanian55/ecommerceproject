import React from "react";

function Signup() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <h2 className="text-3xl mb-4 font-bold text-center text-gray-800">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="mail" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Mail" 
                        id="mail" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password" 
                        id="password" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6 text-center">
                    <button 
                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Sign Up
                    </button>
                </div>

                <div className="text-center">
                    <span className="text-gray-600 text-sm">Already have an account? </span>
                    <a 
                        href="#" 
                        className="text-pink-500 hover:text-pink-700 text-sm font-bold"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Signup;

