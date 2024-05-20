import React, { useEffect, useState } from "react";
import axios from "axios";

function Mywishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const accessToken = localStorage.getItem("token");

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                if (!accessToken) {
                    console.error("Access token not found in localStorage");
                    return;
                }

                // Decode the access token to extract userId
                const payloadBase64 = accessToken.split('.')[1];
                const decodedPayload = atob(payloadBase64);
                const decodedToken = JSON.parse(decodedPayload);
                const userId = decodedToken.user_id;

                // Make the request with userId included in the request params
                const response = await axios.get('http://localhost:3100/wishlist/item', {
                    params: { userId: userId }
                });

                setWishlistItems(response.data); // Update state with the received wishlist items
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };

        fetchWishlistItems();
    }, [accessToken]); // Include accessToken in the dependency array

    const handleDelete = async (productId) => {
        try {
            if (!accessToken) {
                console.error("Access token not found in localStorage");
                return;
            }

            // Optimistically update the state to remove the product
            setWishlistItems(prevItems => 
                prevItems.map(wishlist => ({
                    ...wishlist,
                    products: wishlist.products.filter(product => product._id !== productId)
                })).filter(wishlist => wishlist.products.length > 0)
            );

            // Decode the access token to extract userId
            const payloadBase64 = accessToken.split('.')[1];
            const decodedPayload = atob(payloadBase64);
            const decodedToken = JSON.parse(decodedPayload);
            const userId = decodedToken.user_id;

            // Make the delete request with userId and productId
            await axios.delete('http://localhost:3100/wishlist/delete', {
                data: { userId: userId, productId: productId }
            });
        } catch (error) {
            console.error("Error deleting wishlist item:", error);
            // If there's an error, refetch the wishlist items to ensure the state is accurate
            const payloadBase64 = accessToken.split('.')[1];
            const decodedPayload = atob(payloadBase64);
            const decodedToken = JSON.parse(decodedPayload);
            const userId = decodedToken.user_id;

            const response = await axios.get('http://localhost:3100/wishlist/item', {
                params: { userId: userId }
            });

            setWishlistItems(response.data);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-8">My Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map((wishlist, index) => (
                    <div key={index} className="order-card border rounded-lg overflow-hidden shadow-lg">
                        <div className="p-4">
                            <div className="mb-4">
                                <p className="text-gray-800"><span className="font-semibold text-gray-900">User Name:</span> <span className="text-blue-700">{wishlist.userId.name}</span></p>
                                <p className="text-gray-800"><span className="font-semibold text-gray-900">User Email:</span> <span className="text-blue-700">{wishlist.userId.email}</span></p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {wishlist.products.map((product, productIndex) => (
                                    <div key={productIndex} className="product-item relative">
                                        <img src={`http://localhost:3100${product.imageFile}`} alt={product.name} className="w-full h-64 object-contain" />
                                        <div className="p-4">
                                            <p className="font-semibold text-gray-900">{product.name}</p>
                                            <p className="text-gray-700">Price: <span className="text-green-700">Rs.{product.price}</span></p>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mywishlist;





