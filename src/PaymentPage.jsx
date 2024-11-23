import React from "react";
import { useLocation } from 'react-router-dom';
import "./PaymentPage.css";

const PaymentPage = () => {
    const location = useLocation();
    const { cart, total } = location.state || { cart: [], total: 0 };

    return (
        <div className="container">
            <div className="payment-method">
                <h2 className="heading">Payment Method</h2>
                <div className="payment-card">
                    <div className="card-header">
                        <h3 className="subheading">Credit/Debit</h3>
                        <div className="logos">
                            <img
                                src="https://placehold.co/40x25?text=VISA"
                                alt="VISA logo"
                                className="logo"
                            />
                            <img
                                src="https://placehold.co/40x25?text=MC"
                                alt="MasterCard logo"
                                className="logo"
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
                <h2 className="heading">Order Summary</h2>
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
                <button className="pay-button">Pay</button>
            </div>

        </div>
    );
};
export default PaymentPage;
