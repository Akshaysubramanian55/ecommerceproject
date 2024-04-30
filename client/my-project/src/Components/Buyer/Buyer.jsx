import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import ImageCarousel from "./Courasel/Courasel";
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Faq from "../faq/Faq";

function Buyer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3100/getuser');
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleViewUser = (productId) => {
        if (productId !== undefined) {
            console.log("View button clicked for ID:", productId);
            // You can perform further actions based on the product ID
        } else {
            console.error("ID is undefined");
        }
    };

    return (
        <div className="bg-yellow-100 min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Image Carousel with Margin */}
            <div className="container mx-auto px-4 py-8 ">
                <h1 className="text-3xl font-bold mb-8 text-black">Featured Products</h1>

                {/* Add margin to the ImageCarousel */}
                <div className="mb-8">
                    <ImageCarousel />
                </div>

                {loading ? (
                    <p className="text-gray-600 text-lg">Loading...</p>
                ) : error ? (
                    <p className="text-red-600 text-lg">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-white">
                                {product.imageFile && (
                                    <img
                                        src={`http://localhost:3100${product.imageFile}`} // Construct image URL
                                        alt={product.productName}
                                        className="w-full h-64 object-contain rounded-lg shadow-md"
                                        style={{ objectFit: 'contain' }}
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-yellow-700">{product.productName}</h3>
                                    <p className="text-yellow-600 mb-2">Price: <span className="text-green-600 font-semibold">${product.price}</span></p>

                                    {/* Tags Section */}
                                    <div className="flex flex-wrap mb-2">
                                        {product.tags.split(',').map((tag) => (
                                            <span key={tag} className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md mr-2 mb-2">{tag.trim()}</span>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 mb-2">Shipping Method: <span className="text-purple-600">{product.shippingMethod}</span></p>
                                </div>

                                <Link to={`/cartproduct/${product._id}`}>
                                    <button
                                        className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                        onClick={() => handleViewUser(product._id)}
                                    >
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Faq />
            <Footer />
        </div>
    );
}

export default Buyer;



