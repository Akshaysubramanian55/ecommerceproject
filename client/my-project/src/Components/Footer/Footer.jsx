import React from "react";

function Footer() {
    return (
        <footer className="bg-yellow-100 text-black py-12 border-t border-gray-600">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {/* Column 1: About */}
                <div>
                    <h3 className="text-xl font-bold mb-4">ABOUT</h3>
                    <ul className="space-y-2">
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Careers</li>
                    </ul>
                </div>

                {/* Column 2: Help */}
                <div>
                    <h3 className="text-xl font-bold mb-4">HELP</h3>
                    <ul className="space-y-2">
                        <li>Payments</li>
                        <li>Shipping</li>
                        <li>Cancellation and Returns</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                {/* Column 3: Consumer Policy */}
                <div>
                    <h3 className="text-xl font-bold mb-4">CONSUMER POLICY</h3>
                    <ul className="space-y-2">
                        <li>Cancellation & Returns</li>
                        <li>Terms of Use</li>
                        <li>Security</li>
                        <li>Privacy</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


