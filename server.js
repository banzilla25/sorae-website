import express from 'express';
import cors from 'cors';
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS so our React frontend (port 5174/5175/etc) can call this backend
app.use(cors());
app.use(express.json());

// Initialize Midtrans Snap API
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.VITE_MIDTRANS_CLIENT_KEY
});

// Endpoint to generate transaction token
app.post('/api/create-transaction', async (req, res) => {
  try {
    const { order_id, gross_amount, item_details, customer_details } = req.body;

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount
      },
      item_details: item_details,
      customer_details: customer_details
    };

    const transaction = await snap.createTransaction(parameter);
    
    // Return the token to the frontend
    res.json({ token: transaction.token });
    
  } catch (error) {
    console.error('Error generating Midtrans token:', error);
    res.status(500).json({ error: 'Failed to generate payment token' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
