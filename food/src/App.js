import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import OrderHistory from './components/OrderHistory';
import PlaceOrder from './components/PlaceOrder'; // Import the PlaceOrder component
import './App.css';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/place-order" element={<PlaceOrder />} /> {/* Add route for Place Order */}
      </Routes>
    </Router>
  );
};

export default App;
