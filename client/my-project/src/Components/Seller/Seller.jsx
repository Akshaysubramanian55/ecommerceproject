import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';

function Seller() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [imageBase64, setImageBase64] = useState(""); // State to hold base64 string
    const [shippingMethod, setShippingMethod] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [description,setDescription]=useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();


    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
    }

    // Decode the access token to extract userId
    const payloadBase64 = accessToken.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    const userId = decodedToken.user_id;

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setImageBase64(base64String); // Update state with base64 string
            };

            reader.readAsDataURL(file); // Read file as data URL (base64)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3100/seller', {
                productName,
                price,
                tags,
                imageBase64,
                shippingMethod,
                sellerName,
                description,
                contactEmail,
                userId,
                categories: selectedCategory,
            });

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                }).then(() => {
                    navigate('/getproducts')
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.message,
                });
            }

            // Reset form fields after submission
            setProductName("");
            setPrice("");
            setTags("");
            setImageBase64("");
            setShippingMethod("");
            setSellerName("");
            setContactEmail("");
            setSelectedCategory("");
        } catch (error) {
            console.error("Error adding item:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to add item. Please try again.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Item</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma-separated)"
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full py-2 mb-4"
                    />
                    <select
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Shipping Method</option>
                        <option value="standard">Standard Shipping</option>
                        <option value="express">Express Shipping</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Seller Name"
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Contact Email"
                        className="w-full px-4 py-2 border rounded-md mb-6 focus:outline-none focus:border-blue-500"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                     <input
                        type="text"
                        placeholder="enter description"
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                     <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="footwear">Footwear</option>
                        <option value="mensfashion">Men's Fashion</option>
                        <option value="bags">Bags</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Seller;


