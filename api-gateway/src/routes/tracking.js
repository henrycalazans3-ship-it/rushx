const express = require('express');
const axios = require('axios');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const TRACKING_SERVICE = process.env.TRACKING_SERVICE_URL || 'http://localhost:3004';

// Get tracking info
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${TRACKING_SERVICE}/tracking/${req.params.orderId}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching tracking info'
      }
    });
  }
});

// Update location
router.post('/:orderId/location', verifyToken, async (req, res) => {
  try {
    const response = await axios.post(`${TRACKING_SERVICE}/tracking/${req.params.orderId}/location`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error updating location'
      }
    });
  }
});

// Get route
router.get('/:orderId/route', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${TRACKING_SERVICE}/tracking/${req.params.orderId}/route`, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching route'
      }
    });
  }
});

module.exports = router;
