import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

function Order() {
    const [orderItems, setOrderItems] = useState([]);
    const accessToken = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                if (!accessToken) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Please login to access this feature",
                    }).then(() => {
                        navigate('/signin');
                    });
                } else {
                    // Decode the access token to extract userId
                    const payloadBase64 = accessToken.split('.')[1];
                    const decodedPayload = atob(payloadBase64);
                    const decodedToken = JSON.parse(decodedPayload);
                    const userId = decodedToken.user_id;

                    // Make the request with userId included in the request body
                    const response = await axios.get('http://localhost:3100/order/item', {
                        params: { userId: userId }
                    });

                    console.log("Response from fetchOrderItems:", response.data);

                    setOrderItems(response.data); // Update state with the received order items
                }
            } catch (error) {
                console.error("Error fetching order items:", error);
            }
        };

        fetchOrderItems();
    }, [accessToken]); // Include accessToken in the dependency array

    return (
        <div className="order-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orderItems.map((order, index) => (
                <div key={index} className="order-card border rounded-lg overflow-hidden shadow-lg">
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Order Item #{index + 1}</h3>
                        <div className="mb-4">
                            <p><span className="font-semibold">User Name:</span> {order.userId.name}</p>
                            <p><span className="font-semibold">User Email:</span> {order.userId.email}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {order.products.map((product, productIndex) => (
                                <div key={productIndex} className="product-item">
                                    <img src={`http://localhost:3100${product.imageFile}`} alt={product.name} className="w-full h-64 object-contain" />
                                    <div className="p-4">
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-blue-700">Price: Rs.{product.price}</p>
                                        <div className="text-blue-700">
                                            Quantity: {order.quantities[productIndex]}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-200">
                            <p className="font-semibold">Total Price: RS.{calculateTotalPrice(order.products, order.quantities).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Function to calculate total price of all products
const calculateTotalPrice = (products, quantities) => {
    return products.reduce((total, product, index) => {
        const quantity = quantities[index];
        return total + (product.price * quantity);
    }, 0);
}

export default Order;





