import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Access to history object for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3100/signin', {
                email: email,
                password: password,
            });

            if (response.data && response.data.token) {
                const { token, role } = response.data;
                localStorage.setItem('token', token);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });

                // Redirect based on role after successful sign-in
                if (role === 'seller') {
                    navigate('/getproducts');
                } else if (role === 'buyer') {
                    navigate('/');
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Invalid credentials. Please try again.",
                });
            }

            // Reset form fields after successful submission
            setEmail("");
            setPassword("");

        } catch (error) {
            console.error("Signin error:", error);

            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Invalid credentials. Please try again.",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to sign in. Please try again.",
                });
            }
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-2xl mb-4 font-bold text-center text-gray-800">Sign In</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                </form>

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


