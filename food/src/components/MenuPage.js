import React, { useEffect, useState } from 'react';
import PlaceOrderPage from './PlaceOrder';
import OrderHistoryPage from './OrderHistory'; // Import OrderHistoryPage
import './MenuPage.css'; 

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPlaceOrderPage, setShowPlaceOrderPage] = useState(false);
  const [orders, setOrders] = useState([]); // State to store placed orders
  const [showOrderHistoryPage, setShowOrderHistoryPage] = useState(false); // State for order history page

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/6700cff6e41b4d34e43d3fee', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$Sm15tiRsRcpT7gbl5cY6veYnc/45BozpJw7GpXIHU8e/kv0SA9s8e',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.record.record)) {
          setMenuData(data.record.record);
        } else {
          setMenuData([]);
          setError(new Error('Menu data is not an array'));
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
      });
  }, []);

  const handleAddToOrder = (item) => {
    setSelectedItem(item);
    setShowPlaceOrderPage(true);
  };

  const addOrder = (orderDetails) => {
    setOrders([...orders, orderDetails]); // Add new order to the order history
    setShowPlaceOrderPage(false); // Hide place order page after order is placed
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="menu-page">
      <button className="order-history-button" onClick={() => setShowOrderHistoryPage(true)}>
            Order History
          </button>
      {!showPlaceOrderPage && !showOrderHistoryPage && (
        <>
          <h1>Menu</h1>
          <ul className="menu-list">
            {menuData.map(item => (
              <li key={item.id} className="menu-item">
                <img src={item.image_url} alt={item.name} className="menu-item-image" />
                <h2>{item.name}</h2>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                <p>Available Quantity: {item.available_quantity}</p>
                <button className="add-to-order" onClick={() => handleAddToOrder(item)}>
                  Add to Order
                </button>
              </li>
            ))}
          </ul>
          
        </>
      )}

      {showPlaceOrderPage && (
        <PlaceOrderPage selectedItem={selectedItem} addOrder={addOrder} />
      )}

      {showOrderHistoryPage && (
        <OrderHistoryPage orders={orders} onBack={() => setShowOrderHistoryPage(false)} />
      )}
    </div>
  );
};

export default MenuPage;
