import React from "react";
import { useLocation } from "react-router-dom";
import "../style/OrderHistory.css";

const OrderHistory = () => {
    const location = useLocation();
    const { orderDetails } = location.state || { orderDetails: null };

    const defaultOrders = [
        {
            id: 86269,
            product: "Premium Listing (1)",
            dateTime: "1:01 pm, Nov 21, 2024",
            status: "Pending",
            price: "3 Thousand",
        },
        {
            id: 86268,
            product: "Premium Listing (1)",
            dateTime: "12:59 pm, Nov 21, 2024",
            status: "Pending",
            price: "3 Thousand",
        },
    ];

    const orders = orderDetails ? [orderDetails, ...defaultOrders] : defaultOrders;

    return (
        <div className="table-container">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Products</th>
                        <th>Date & Time</th>
                        <th>Order Status</th>
                        <th>Price (PKR)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                <i className="fas fa-map-marker-alt product-icon"></i> {order.product}
                            </td>
                            <td>{order.dateTime}</td>
                            <td>
                                <span className={`status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.price}</td>
                            <td>
                                <button className="action-button">Retry</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
