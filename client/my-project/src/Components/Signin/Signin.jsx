import React from "react";

function Signin() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-2xl mb-4 font-bold text-center text-gray-800">Sign In</h2>

                <div className="mb-4">
                    <label htmlFor="mail" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email" 
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
                        <a href="#" className="text-pink-500 ml-1 hover:text-pink-700 font-bold">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;

