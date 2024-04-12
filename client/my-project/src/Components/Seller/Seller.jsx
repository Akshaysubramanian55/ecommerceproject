import React, { useState } from "react";

function Seller() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [shippingMethod, setShippingMethod] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const handleAddItem = () => {
        // Handle form submission logic here
        console.log({
            productName,
            price,
            tags,
            imageFile,
            shippingMethod,
            sellerName,
            contactEmail
        });
        // Reset form fields after submission (if needed)
        setProductName("");
        setPrice("");
        setTags("");
        setImageFile(null);
        setShippingMethod("");
        setSellerName("");
        setContactEmail("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Item</h1>
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
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleAddItem}
                >
                    Add Item
                </button>
            </div>
        </div>
    );
}

export default Seller;

