import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import filter from './images/filter.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar({ setKeyword, onCategorySelect }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSearch = (e) => {
        const searchKeyword = e.target.value;
        setKeyword(searchKeyword);
    };

    const handleFilterClick = (category) => {
        setShowDropdown(false);
        onCategorySelect(category);
    };

    const handleLogout = () => {
        // Remove token and cartItems from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        setIsLoggedIn(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-600 py-2 border-b border-white-600">
            <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
                <div className="flex items-center justify-between w-full">
                    <div className="text-white text-lg font-bold">My Store</div>
                    <button className="text-white md:hidden" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
                    </button>
                </div>

                <div className={`md:flex ${menuOpen ? "flex" : "hidden"} flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-white mt-2 md:mt-0 w-full`}>
                    <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <li><Link to="/">Home</Link></li>
                        {isLoggedIn ? (
                            <li className="cursor-pointer" onClick={handleLogout}>Log Out</li>
                        ) : (
                            <li><Link to="/signin">Sign In</Link></li>
                        )}
                        <li><Link to="/mycart">My Cart</Link></li>
                        <li><Link to="/myorders">My Orders</Link></li>
                        <li><Link to="/mywishlist">My Wishlist</Link></li>
                        <li><Link to="/getproducts">seller</Link></li>
                    </ul>

                    <div className="md:flex items-center mt-2 md:mt-0 relative w-full md:w-auto">
                        <div className="flex items-center w-full md:w-auto">
                            <img src={filter} alt="Filter" className="w-6 h-6 mr-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
                            <input
                                type="search"
                                placeholder="Search for Products"
                                className="bg-white text-gray-800 px-3 py-1 rounded-lg focus:outline-none w-full md:w-auto"
                                onChange={handleSearch}
                            />
                        </div>
                        {showDropdown && (
                            <div className="absolute left-0 mt-2 bg-black text-white border border-gray-300 rounded-lg shadow-lg" style={{ top: '100%', zIndex: 10 }}>
                                <ul className="py-4">
                                    <li className="px-4 py-2 cursor-pointer" onClick={() => handleFilterClick('Electronics')}>Electronics</li>
                                    <li className="px-4 py-2 cursor-pointer" onClick={() => handleFilterClick('MensFashion')}>Men's Fashion</li>
                                    <li className="px-4 py-2 cursor-pointer" onClick={() => handleFilterClick('Bags')}>Bags</li>
                                    <li className="px-4 py-2 cursor-pointer" onClick={() => handleFilterClick('Footwear')}>Footwear</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

