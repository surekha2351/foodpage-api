import React, { useState } from 'react';
import MenuPage from './MenuPage';
import PlaceOrderPage from './PlaceOrderPage';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // This function handles the order
  const addOrder = (orderDetails) => {
    console.log('Order received:', orderDetails);
    // Add order handling logic here (e.g., send order to a server or update app state)
  };

  return (
    <div>
      {/* Show MenuPage or PlaceOrderPage conditionally */}
      {selectedItem ? (
        <PlaceOrderPage selectedItem={selectedItem} addOrder={addOrder} />
      ) : (
        <MenuPage onSelectItem={setSelectedItem} />
      )}
    </div>
  );
};

export default App;
