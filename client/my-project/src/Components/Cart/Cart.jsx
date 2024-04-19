import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CartProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3100/cartproduct/${productId}`);
                setProduct(response.data); // Assuming response.data contains product details
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError("Error fetching product. Please try again later.");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Product Details</h1>
            {product && (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
                    <div className="p-4">
                        {/* Image Section */}
                        <div className="mb-4">
                            <img
                                src={`http://localhost:3100${product.imageFile}`}
                                alt={product.productName}
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        {/* Details Section */}
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.productName}</h3>
                            <p className="text-lg text-gray-700 mb-2">Price: ${product.price}</p>
                            <p className="text-lg text-gray-700 mb-2">Tags: {product.tags}</p>
                            <p className="text-lg text-gray-700 mb-2">Shipping Method: {product.shippingMethod}</p>
                            <p className="text-lg text-gray-700 mb-2">Seller Name: {product.sellerName}</p>
                            <p className="text-lg text-gray-700 mb-4">Contact Email: {product.contactEmail}</p>

                            {/* Add to Cart Button */}
                            <Link to="/cartdetails">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
                                    Add to Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartProduct;

