import React from "react";

function Footer() {
    return (
        <div className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 md:flex md:justify-center md:gap-8">
                {/* Column 1: About */}
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">ABOUT</h3>
                    <ul className="space-y-1">
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Careers</li>
                    </ul>
                </div>

                {/* Column 2: Help */}
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">HELP</h3>
                    <ul className="space-y-1">
                        <li>Payments</li>
                        <li>Shipping</li>
                        <li>Cancellation and Returns</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                {/* Column 3: Consumer Policy */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">CONSUMER POLICY</h3>
                    <ul className="space-y-1">
                        <li>Cancellation & Returns</li>
                        <li>Terms of Use</li>
                        <li>Security</li>
                        <li>Privacy</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
