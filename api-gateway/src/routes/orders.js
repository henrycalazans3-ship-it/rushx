const express = require('express');
const axios = require('axios');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || 'http://localhost:3002';

// Create order
router.post('/', verifyToken, async (req, res) => {
  try {
    const response = await axios.post(`${ORDER_SERVICE}/orders`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error creating order'
      }
    });
  }
});

// Get orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE}/orders`, {
      params: req.query,
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching orders'
      }
    });
  }
});

// Get order by ID
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE}/orders/${req.params.orderId}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching order'
      }
    });
  }
});

// Accept order
router.put('/:orderId/accept', verifyToken, async (req, res) => {
  try {
    const response = await axios.put(`${ORDER_SERVICE}/orders/${req.params.orderId}/accept`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error accepting order'
      }
    });
  }
});

// Reject order
router.put('/:orderId/reject', verifyToken, async (req, res) => {
  try {
    const response = await axios.put(`${ORDER_SERVICE}/orders/${req.params.orderId}/reject`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error rejecting order'
      }
    });
  }
});

module.exports = router;
