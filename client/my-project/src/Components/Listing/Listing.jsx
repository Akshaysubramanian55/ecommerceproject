import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function GetProduct() {
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Products</h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 hover:border-blue-500">
                                {product.imageFile && (
                                    <img
                                        src={`http://localhost:3100/controller/${product.imageFile}`}
                                        alt={product.productName}
                                        className="w-full h-64 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.productName}</h3>
                                    <p className="text-gray-600 mb-2">Price: <span className="text-green-600 font-semibold">${product.price}</span></p>
                                    <p className="text-gray-600 mb-2">Tags: <span className="text-blue-600">{product.tags}</span></p>
                                    <p className="text-gray-600 mb-2">Shipping Method: <span className="text-purple-600">{product.shippingMethod}</span></p>
                                    <p className="text-gray-600 mb-2">Seller: <span className="text-yellow-600 font-semibold">{product.sellerName}</span></p>
                                    <p className="text-gray-600 mb-2">Contact Email: <a href={`mailto:${product.contactEmail}`} className="text-blue-600 hover:underline">{product.contactEmail}</a></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/seller">
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add Product
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default GetProduct;








