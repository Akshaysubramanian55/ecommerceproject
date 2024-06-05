import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";

function CartProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [reviewData, setReviewData] = useState({
        userName: "",
        rating: 0,
        comment: "",
        userId: ""
    });
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3100/cart/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError("Error fetching product. Please try again later.");
                setLoading(false);
            }
        };

        fetchProduct();

        const token = localStorage.getItem('token');
        if (token) {
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = atob(payloadBase64);
            const decodedToken = JSON.parse(decodedPayload);
            setUserId(decodedToken.user_id);
        }

        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }

        // Check if product is already added to cart
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setIsAddedToCart(storedCartItems.includes(productId));
    }, [productId, reviewSubmitted]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value,
            userId: userId
        });
    };

    const handleRatingChange = (newRating) => {
        setReviewData({
            ...reviewData,
            rating: newRating
        });
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Authentication token not found. Please log in.");
                return;
            }
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = atob(payloadBase64);
            const decodedToken = JSON.parse(decodedPayload);
            const userId = decodedToken.user_id;

            const reviewDataWithUserId = {
                ...reviewData,
                userId: userId
            };

            const response = await axios.post(`http://localhost:3100/addreview/${productId}`, reviewDataWithUserId);
            console.log("Review submitted successfully:", response);
            setReviewSubmitted(true);
            setShowReviewForm(false);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const addToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Authentication token not found. Please log in.");
                return;
            }
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = atob(payloadBase64);
            const decodedToken = JSON.parse(decodedPayload);
            const userId = decodedToken.user_id;

            const payload = { userId, productId };
            console.log("Payload being sent to the server:", payload);

            await axios.post(`http://localhost:3100/cart/add`, payload);
            
            // Update local storage with updated cart items
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            localStorage.setItem('cartItems', JSON.stringify([...storedCartItems, productId]));

            setIsAddedToCart(true); // Set to true after successful addition to cart
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }

    const isOwner = userEmail && product && userEmail === product.contactEmail;

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Product Details</h1>
                {product && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-wrap md:flex-nowrap">
                        <div className="bg-gray-200 flex flex-col items-center justify-between w-full md:w-1/3 p-4">
                            <div className="flex flex-col items-center w-full h-96">
                                <img
                                    src={`http://localhost:3100${product.imageFile}`}
                                    alt={product.productName}
                                    className="w-full h-80 object-contain mb-4 rounded-lg shadow-lg"
                                />
                                <div className="w-full flex justify-around mt-4 space-x-2">
                                    {isOwner ? (
                                        <p className="text-red-600 font-bold">This product belongs to you</p>
                                    ) : (
                                        <>
                                            {isAddedToCart ? (
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                                                >
                                                    Added to Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={addToCart}
                                                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setShowReviewForm(!showReviewForm)}
                                                className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                                            >
                                                {showReviewForm ? "Hide Review Form" : "Add Review"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 w-full md:w-2/3">
                            <h2 className="text-3xl font-semibold text-blue-800 mb-4">{product.productName}</h2>
                            <p className="text-lg text-green-700 mb-4">Price: <span className="text-green-600 font-bold">Rs.{product.price}</span></p>
                            <p className="text-gray-700 mb-6"><span className="font-semibold text-purple-700">Description:</span> <span className="text-blue-700 italic">{product.description}</span></p>
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Reviews</h3>
                                {product.reviews && product.reviews.length > 0 ? (
                                    product.reviews.map((review, index) => (
                                        <div key={index} className="bg-purple-50 rounded-lg shadow-md p-4 mb-4">
                                            <p className="text-indigo-700 text-lg font-semibold mb-2">{review.userName}</p>
                                            <ReactStars
                                                count={5}
                                                value={review.rating}
                                                size={24}
                                                edit={false}
                                                color2={'#ffd700'}
                                            />
                                            <p className="text-teal-700 mt-2 leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-700">No reviews yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="mt-4 p-6 bg-gray-200 rounded-lg">
                        <ReactStars
                            count={5}
                            onChange={handleRatingChange}
                            size={24}
                            color2={'#ffd700'}
                            value={reviewData.rating}
                        />
                        <textarea
                            placeholder="Comment"
                            name="comment"
                            value={reviewData.comment}
                            onChange={handleInputChange}
                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-indigo-700 resize-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                        >
                            Submit Review
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CartProduct;
