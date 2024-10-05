const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// External API URL for fetching menu data
const MENU_API_URL = 'https://api.jsonbin.io/v3/b/6700cff6e41b4d34e43d3fee';

// Function to fetch menu data from external API
async function fetchMenuData() {
  try {
    const response = await axios.get(MENU_API_URL, {
      headers: {
        'X-Master-Key': '$2a$10$Sm15tiRsRcpT7gbl5cY6veYnc/45BozpJw7GpXIHU8e/kv0SA9s8e',
      }
    });
    return response.data.record;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
}

// Mock order storage
let orders = [];

// GET /menu - Fetch available menu items
app.get('/menu', async (req, res) => {
  try {
    const menuData = await fetchMenuData();
    if (!Array.isArray(menuData)) {
      throw new Error('Invalid data format');
    }
    const availableItems = menuData.filter(item => item.available_quantity > 0);
    res.json(availableItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu data' });
  }
});

// POST /order - Place an order
app.post('/order', (req, res) => {
  const { tableNumber, contactNumber, orderItems } = req.body;

  // Check if order items are valid
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const newOrder = {
    id: orders.length + 1,
    tableNumber,
    contactNumber: contactNumber || 'N/A',
    orderItems,
    orderDate: new Date(),
    status: 'Placed',
  };

  // Validate available quantities for each order item
  for (const item of orderItems) {
    if (item.quantity > item.available_quantity) {
      return res.status(400).json({ error: `Insufficient quantity for ${item.name}` });
    }
  }

  orders.push(newOrder);
  res.status(201).json({ message: 'Order placed successfully', order: newOrder });
});

// GET /orders - Get order history
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
