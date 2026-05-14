const express = require('express');
const axios = require('axios');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3003';

// Process payment
router.post('/process', verifyToken, async (req, res) => {
  try {
    const response = await axios.post(`${PAYMENT_SERVICE}/payments/process`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error processing payment'
      }
    });
  }
});

// Get payment status
router.get('/:paymentId', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${PAYMENT_SERVICE}/payments/${req.params.paymentId}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching payment'
      }
    });
  }
});

// Withdraw money
router.post('/withdraw', verifyToken, async (req, res) => {
  try {
    const response = await axios.post(`${PAYMENT_SERVICE}/payments/withdraw`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error processing withdrawal'
      }
    });
  }
});

// Get wallet
router.get('/wallet/:userId', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${PAYMENT_SERVICE}/wallets/${req.params.userId}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching wallet'
      }
    });
  }
});

module.exports = router;
