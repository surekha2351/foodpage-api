import React, { useState } from 'react';
import './MenuPage.css';

const OrderHistoryPage = ({ orders, onBack }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterQuantity, setFilterQuantity] = useState('');

  // Filter orders based on selected date, name, and quantity
  const filteredOrders = orders.filter(order => {
    const matchesDate = filterDate ? order.date === filterDate : true;
    const matchesName = filterName ? order.itemName.toLowerCase().includes(filterName.toLowerCase()) : true;
    const matchesQuantity = filterQuantity ? order.quantity === Number(filterQuantity) : true;

    return matchesDate && matchesName && matchesQuantity;
  });

  // Correct calculation of total items sold (sum of quantities)
  const totalItemsSold = filteredOrders.reduce((total, order) => total + Number(order.quantity), 0);

  return (
    <div className="order-history-page">
      <h1>Order History</h1>

      <label>
        Filter by Date:
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </label>
      <label>
        Filter by Name:
        <input type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Item Name" />
      </label>
     
      {/* Display total items sold for the filtered orders */}
      <h3>Total Items Sold: {totalItemsSold}</h3>

      {filteredOrders.length > 0 ? (
        <ul>
          {filteredOrders.map((order, index) => (
            <li key={index}>
              <h3>{order.itemName}</h3>
              <p>Table Number: {order.tableNumber}</p>
              <p>Contact: {order.contactNumber}</p>
              <p>Date: {order.date}</p>
              <p>Time: {order.time}</p>
              <p>Quantity: {order.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this filter.</p>
      )}

      <button className="back-history-button" onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default OrderHistoryPage;
