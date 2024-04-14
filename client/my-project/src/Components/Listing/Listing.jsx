import React, { useState, useEffect } from "react";
import axios from 'axios';

function GetProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3100/getproducts');
                setProducts(response.data.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
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
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            {product.imageFile && (
                                <img
                                    src={`${product.imageFile}`}
                                    alt={product.productName}
                                    className="w-full h-auto"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                                <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                                <p className="text-gray-600 mb-2">Tags: {product.tags}</p>
                                <p className="text-gray-600 mb-2">Shipping Method: {product.shippingMethod}</p>
                                <p className="text-gray-600 mb-2">Seller: {product.sellerName}</p>
                                <p className="text-gray-600 mb-2">Contact Email: {product.contactEmail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetProduct;





