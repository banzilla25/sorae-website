import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

const midtransPlugin = () => ({
  name: 'midtrans-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/create-transaction' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            
            const parameter = {
              transaction_details: {
                order_id: data.order_id,
                gross_amount: data.gross_amount
              },
              item_details: data.item_details,
              customer_details: data.customer_details
            };

            const snap = new midtransClient.Snap({
              isProduction: false,
              serverKey: process.env.MIDTRANS_SERVER_KEY,
              clientKey: process.env.VITE_MIDTRANS_CLIENT_KEY
            });

            const transaction = await snap.createTransaction(parameter);
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ token: transaction.token }));
          } catch (error) {
            console.error('Midtrans Error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), midtransPlugin()],
  build: {
    chunkSizeWarningLimit: 1000,
  }
});
