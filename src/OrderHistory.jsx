import React, { useState, useEffect } from 'react';
import './Orderhistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('https://api.example.com/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container">
      <div className="table-wrapper">
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
                  <i className="fas fa-map-marker-alt product-icon"></i>
                  {order.product}
                </td>
                <td>{order.date}</td>
                <td>
                  <span
                    className={`status-badge ${
                      order.status === 'Pending' ? 'status-pending' : 'status-completed'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.price}</td>
                <td>
                  {order.status === 'Pending' ? (
                    <button className="action-button retry-button">Retry</button>
                  ) : (
                    <>
                      <button className="action-button delete-button">Delete</button>
                      <button className="action-button renew-button">Renew</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
