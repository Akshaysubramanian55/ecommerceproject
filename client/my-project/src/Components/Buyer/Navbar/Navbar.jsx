import React, { useState } from "react";
import { Link } from "react-router-dom";
import filter from './images/filter.png';

function Navbar({ setKeyword, onCategorySelect }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = (e) => {
        const searchKeyword = e.target.value;
        setKeyword(searchKeyword); // Update the keyword state with the new search keyword
    };

    const handleFilterClick = (category) => {
        setShowDropdown(false); // Close dropdown when a category is clicked
        onCategorySelect(category); // Pass selected category to the parent component
    };

    return (
        <nav className="bg-gray-600 py-2 border-b border-white-600">
            <div className="container mx-auto px-4 md:flex md:items-center md:justify-between">
                <div className="flex items-center justify-between">
                    <div className="text-white text-lg font-bold">My App</div>
                </div>

                <ul className="md:flex hidden space-x-4 text-white">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/mycart">My Cart</Link></li>
                    <li><Link to="/myorders">My Orders</Link></li>
                    <li><Link to="/mywishlist">My Wishlist</Link></li>
                </ul>
                 
                <div className="md:flex items-center mt-2 md:mt-0 relative">
                    <div className="flex items-center">
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
                            {/* Dropdown content */}
                            <ul className="py-4">
                                <li className="px-4 py-2  cursor-pointer" onClick={() => handleFilterClick('Electronics')}>Electronics</li>
                                <li className="px-4 py-2 cursor-pointer" onClick={() => handleFilterClick('MensFashion')}>Men's Fashion</li>
                                <li className="px-4 py-2 cursor-pointer" onClick={() => handleFilterClick('Bags')}>Bags</li>
                                <li className="px-4 py-2  cursor-pointer" onClick={() => handleFilterClick('Footwear')}>Footwear</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:hidden mt-2 flex flex-col items-center">
                <Link to="/" className="text-white hover:text-gray-300 py-1">Home</Link>
                <Link to="/signin" className="text-white hover:text-gray-300 py-1">Sign In</Link>
            </div>
        </nav>
    );
}

export default Navbar;








