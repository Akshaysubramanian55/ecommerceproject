import React from "react";

function Faq() {
    return (
        <div className="text-center bg-yellow-100 py-12 font-serif">
            <h1 className="text-3xl font-bold mb-8 text-black">FAQ</h1>

            <div className="flex flex-wrap justify-center">
                <div className="max-w-md rounded-lg overflow-hidden shadow-lg m-4 bg-black">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-blue-600">What payment Methods do You Accept</div>
                        <p className="text-white text-base font-normal">
                            We accept a variety of payment methods like credit/debit card, net banking, and select digital wallets. Choose the option that suits you during checkout.
                        </p>
                    </div>
                </div>

                <div className="max-w-md rounded-lg overflow-hidden shadow-lg m-4 bg-black">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-purple-600">How Can I Track my order</div>
                        <p className="text-white text-base font-normal">
                            Once your order is dispatched, you will get a tracking number via email. Use this number to track your order in real-time on our website.
                        </p>
                    </div>
                </div>

                <div className="max-w-md rounded-lg overflow-hidden shadow-lg m-4 bg-black">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-green-600">How do I initiate a return</div>
                        <p className="text-white text-base font-normal">
                            Visit our returns page and follow the provided instructions. Ensure your item meets our return criteria, and our team will guide you through the process.
                        </p>
                    </div>
                </div>

                <div className="max-w-md rounded-lg overflow-hidden shadow-lg m-4 bg-black">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-red-600">Do you offer exchange for Products</div>
                        <p className="text-white text-base font-normal">
                            At this time, we don't offer direct product exchange. If you'd like a new item, please initiate a return and place a new order.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;


