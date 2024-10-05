import React, { useState } from 'react';
//import './PlaceOrderPage.css';

const PlaceOrderPage = ({ selectedItem, addOrder }) => {
  const [orderDetails, setOrderDetails] = useState({
    tableNumber: '',
    contactNumber: '',
    date: '',
    time: '',
    quantity: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    const { quantity } = orderDetails;

    if (selectedItem && selectedItem.available_quantity >= quantity) {
      // Pass the order details to the parent component
      addOrder({
        itemName: selectedItem.name,
        quantity: orderDetails.quantity,
        tableNumber: orderDetails.tableNumber,
        contactNumber: orderDetails.contactNumber,
        date: orderDetails.date,
        time: orderDetails.time
      });

      setMessage('Order placed successfully!');

      setOrderDetails({
        tableNumber: '',
        contactNumber: '',
        date: '',
        time: '',
        quantity: ''
      });
    } else {
      setMessage('Not enough quantity available or item not selected.');
    }
  };

  if (!selectedItem) {
    return <p>No item selected. Please go back to the menu and select an item.</p>;
  }

  return (
    <div className="place-order-page">
      <h3>Place Order for {selectedItem.name}</h3>
      <form>
        <label>
          Table Number:
          <input type="text" name="tableNumber" value={orderDetails.tableNumber} onChange={handleChange} required />
        </label>
        <label>
          Contact Number:
          <input type="text" name="contactNumber" value={orderDetails.contactNumber} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={orderDetails.date} onChange={handleChange} required />
        </label>
        <label>
          Time:
          <input type="time" name="time" value={orderDetails.time} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={orderDetails.quantity} onChange={handleChange} required />
        </label>
        <button type="button" onClick={handlePlaceOrder}>Place Order</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PlaceOrderPage;
