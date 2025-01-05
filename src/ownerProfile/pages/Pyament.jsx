import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import braintree from "braintree-web";
import "../style/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 };
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [braintreeClient, setBraintreeClient] = useState(null);

  const hostedFieldsRef = useRef({
    cardNumber: null,
    expirationDate: null,
    cvv: null,
  });

  useEffect(() => {
    const initializeBraintree = async () => {
      try {
        const { data: clientToken } = await axios.get("/api/braintree/client-token");
        const clientInstance = await braintree.client.create({ authorization: clientToken });
        const hostedFieldsInstance = await braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            input: {
              "font-size": "16px",
              color: "#333",
            },
            ":focus": {
              color: "#000",
            },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "Card Number",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM/YY",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "CVV",
            },
          },
        });
        hostedFieldsRef.current = hostedFieldsInstance;
        setBraintreeClient(clientInstance);
      } catch (error) {
        console.error("Error initializing Braintree:", error);
        setPaymentStatus("Failed to initialize payment gateway.");
      }
    };

    initializeBraintree();
  }, []);

  const handlePayment = async () => {
    if (!hostedFieldsRef.current) {
      setPaymentStatus("Payment fields are not ready.");
      return;
    }

    setIsLoading(true);

    try {
      const { nonce } = await hostedFieldsRef.current.tokenize();
      const orderDetails = {
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        })),
        totalPrice: total,
        paymentNonce: nonce,
      };

      const response = await axios.post("/api/braintree/checkout", orderDetails);

      setPaymentStatus("Payment Successful");
      setIsLoading(false);

      const newOrder = {
        id: response.data.TransactionId,
        product: cart.map((item) => `${item.name} (${item.quantity}x)`).join(", "),
        dateTime: new Date(response.data.CreatedAt).toLocaleString(),
        status: response.data.Status,
        price: `Rs ${total}`,
      };

      navigate("/order-history", { state: { orderDetails: newOrder } });
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("Payment Failed. Please try again.");
      setIsLoading(false);
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
              <img src="../src/assets/visacard.svg" alt="VISA logo" className="logo1" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="card-number" className="label">
              Card Number
            </label>
            <div id="card-number" className="input"></div>
          </div>
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="expiration-date" className="label">
                Expiration Date
              </label>
              <div id="expiration-date" className="input"></div>
            </div>
            <div className="form-group half">
              <label htmlFor="cvv" className="label">
                CVV
              </label>
              <div id="cvv" className="input"></div>
              <p className="hint">The last 3 digits displayed on the back of your card</p>
            </div>
          </div>
        </div>
      </div>

      <div className="order-summary1">
        <h2 className="heading1">Order Summary</h2>
        <div className="divider"></div>
        {cart.map((item) => (
          <div key={item.id} className="summary-item">
            <span>
              {item.name} ({item.quantity}x)
            </span>
            <span>Rs {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="summary-item total">
          <span>Total:</span>
          <span className="total-amount">Rs {total}</span>
        </div>
        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={isLoading || !braintreeClient}
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
        {paymentStatus && <p className="success-message">{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
