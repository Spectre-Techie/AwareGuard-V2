/**
 * Server Update Guide
 * File: awareguard-backend/server/index.js (or server.js)
 * 
 * Instructions:
 * 1. Find where other routes are registered (look for app.use('/api', ...))
 * 2. Add the payment routes import and registration below
 * 3. Register webhook route BEFORE the JSON body limit settings
 * 4. Save and push to GitHub
 */

// ===================================================
// ADD THESE IMPORTS (at the top with other imports)
// ===================================================

const paymentRoutes = require('../routes/payments');

// ===================================================
// EXAMPLE: How your server/index.js should look
// ===================================================

/**
// ... existing imports ...
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('../routes/auth');
const paymentRoutes = require('../routes/payments');  // ADD THIS LINE

dotenv.config();
const app = express();

// ... existing middleware ...
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// ===================================================
// IMPORTANT: Register webhook BEFORE body parser limit
// ===================================================

// Webhook must use raw body parser (if Paystack requires it)
// Place this BEFORE the regular JSON middleware:

app.post('/api/payments/webhook', express.json(), paymentRoutes);

// OR if you have a special webhook handler:
// app.post('/api/payments/webhook', express.raw({type: 'application/json'}), paymentRoutes);

// ===================================================
// REGISTER ALL ROUTES
// ===================================================

// Auth routes
app.use('/api/auth', authRoutes);

// Payment routes
app.use('/api/payments', paymentRoutes);

// Other existing routes...
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/modules', moduleRoutes);

// ===================================================
// ERROR HANDLING & SERVER START
// ===================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Paystack routes registered`);
});
*/

// ===================================================
// WHAT TO ADD - QUICK SUMMARY
// ===================================================

// 1. At top of file, add:
//    const paymentRoutes = require('../routes/payments');

// 2. After middleware setup, add:
//    app.use('/api/payments', paymentRoutes);

// 3. Make sure routes are registered AFTER:
//    - express.json()
//    - CORS setup
//    - Database connection
//    - Authentication middleware

// 4. Test by running:
//    npm start
//    Or: node server/index.js

// ===================================================
// CHECKING IF ROUTES ARE REGISTERED
// ===================================================

// After adding routes, you can test with:
// curl http://localhost:3000/api/payments/subscription-status
// (This will return 401 Unauthorized - expected, since it needs auth token)

// If you get "Cannot POST /api/payments/webhook" - routes aren't registered
// If you get "Unauthorized" - routes are registered! ✅

module.exports = {
  instructions: 'Add payment routes import and app.use() as shown above'
};
