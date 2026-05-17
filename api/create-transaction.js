import midtransClient from 'midtrans-client';

export default async function handler(req, res) {
  // Allow CORS (just in case)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { order_id, gross_amount, item_details, customer_details } = req.body;

    const snap = new midtransClient.Snap({
      isProduction: false, // Tetap sandbox untuk testing
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.VITE_MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      item_details: item_details,
      customer_details: customer_details,
    };

    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({ token: transaction.token });
  } catch (error) {
    console.error('Midtrans Error:', error);
    return res.status(500).json({ error: 'Failed to generate payment token', detail: error.message });
  }
}
