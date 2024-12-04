import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/PaymentPage.css";

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, total } = location.state || { cart: [], total: 0 };
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        const orderDetails = {
            products: cart.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
            })),
            totalPrice: total,
            cardDetails: {
                cardNumber: "4242424242424242", // Replace with actual input values
                expirationDate: "12/24",
                cvv: "123",
            },
        };

        try {
            const response = await axios.post("/api/orders", orderDetails);
            const { orderId, status, createdDate } = response.data;

            const newOrder = {
                id: orderId,
                product: cart.map((item) => `${item.name} (${item.quantity}x)`).join(", "),
                dateTime: new Date(createdDate).toLocaleString(),
                status: status,
                price: `Rs ${total}`,
            };

            setPaymentStatus("Payment Successful");
            setIsLoading(false);

            // Navigate to Order History with the new order
            navigate("/order-history", { state: { orderDetails: newOrder } });
        } catch (error) {
            setPaymentStatus("Payment Failed. Please try again.");
            setIsLoading(false);
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="container">
            <div className="payment-method">
                <h2 className="heading1">Payment Method</h2>
                <div className="payment-card">
                    <div className="card-header">
                        <h3 className="subheading">Credit/Debit</h3>
                        <div className="logos">
                            <img
                                src="../src/assets/visacard.svg"
                                alt="VISA logo"
                                className="logo1"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="card-number" className="label">
                            Card Number
                        </label>
                        <input
                            id="card-number"
                            type="text"
                            placeholder="Card Number"
                            className="input"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="expiration-date" className="label">
                                Expiration Date
                            </label>
                            <input
                                id="expiration-date"
                                type="text"
                                placeholder="MM/YY"
                                className="input"
                            />
                        </div>
                        <div className="form-group half">
                            <label htmlFor="cvv" className="label">
                                CVV
                            </label>
                            <input
                                id="cvv"
                                type="text"
                                placeholder="CVV"
                                className="input"
                            />
                            <p className="hint">
                                The last 3 digits displayed on the back of your card
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-summary1">
                <h2 className="heading1">Order Summary</h2>
                <div className="divider"></div>
                {cart.map((item) => (
                    <div key={item.id} className="summary-item">
                        <span>{item.name} ({item.quantity}x)</span>
                        <span>Rs {item.price * item.quantity}</span>
                    </div>
                ))}
                <div className="summary-item total">
                    <span>Total:</span>
                    <span className="total-amount">Rs {total}</span>
                </div>
                <button className="pay-button" onClick={handlePayment} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Pay"}
                </button>
                {paymentStatus && <p className="success-message">{paymentStatus}</p>}
            </div>
        </div>
    );
};

export default PaymentPage;
