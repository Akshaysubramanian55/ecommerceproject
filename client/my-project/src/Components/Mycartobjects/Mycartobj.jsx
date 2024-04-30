import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function MyCartObjects() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Retrieve access token from localStorage
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

        // Fetch cart items from backend using userId as a query parameter
        const response = await axios.get('http://localhost:3100/mycart', {
          params: { userId: userId }
        });

        console.log("Response from fetchCartItems:", response.data);

        // Update cartItems state with the fetched data
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="container">
      <h1 className="my-4 text-3xl font-bold text-center text-indigo-700">My Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <div key={cartItem._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`http://localhost:3100${cartItem.productId.imageFile}`}
                className="w-full h-64 object-contain"
                alt={cartItem.productId.productName}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-indigo-700">{cartItem.productId.productName}</h3>
                <p className="text-lg text-gray-800 my-2">
                  <strong>Price:</strong> <span className="text-green-600">${cartItem.productId.price}</span>
                </p>
                <p className="text-lg text-gray-800 my-2">
                  <strong>Tags:</strong> 
                  {cartItem.productId.tags.split(',').map((tag, index) => (
                    <span key={index} className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-800 mr-2">
                      {tag.trim()}
                    </span>
                  ))}
                </p>
                <p className="text-lg text-gray-800 my-2">
                  <strong>Shipping Method:</strong> {cartItem.productId.shippingMethod}
                </p>
               
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-800 text-center">No items in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default MyCartObjects;




