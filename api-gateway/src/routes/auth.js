const express = require('express');
const axios = require('axios');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Proxy requests to User Service
router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error registering user'
      }
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error logging in'
      }
    });
  }
});

router.post('/verify-sms', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE}/auth/verify-sms`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error verifying SMS'
      }
    });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE}/auth/profile`, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error fetching profile'
      }
    });
  }
});

router.put('/profile', verifyToken, async (req, res) => {
  try {
    const response = await axios.put(`${USER_SERVICE}/auth/profile`, req.body, {
      headers: { Authorization: `Bearer ${req.token}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        code: 'SERVICE_ERROR',
        message: error.response?.data?.message || 'Error updating profile'
      }
    });
  }
});

module.exports = router;
