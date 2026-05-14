const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simulate SMS verification (In production, use Twilio)
const smsStorage = new Map();

const register = async (req, res) => {
  try {
    const { phoneNumber, name, userType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'User with this phone number already exists'
        }
      });
    }

    // Generate SMS code (6 digits)
    const smsCode = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = `session_${Date.now()}_${Math.random()}`;

    // Store temporarily (in production, use Redis)
    smsStorage.set(sessionId, {
      phoneNumber,
      name,
      userType,
      code: smsCode,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    console.log(`📱 SMS Code for ${phoneNumber}: ${smsCode}`);

    res.status(201).json({
      success: true,
      message: 'SMS sent to your phone number',
      sessionId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message
      }
    });
  }
};

const verifySMS = async (req, res) => {
  try {
    const { sessionId, code } = req.body;

    if (!sessionId || !code) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'sessionId and code are required'
        }
      });
    }

    const session = smsStorage.get(sessionId);
    if (!session) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Invalid session ID'
        }
      });
    }

    if (session.expiresAt < Date.now()) {
      smsStorage.delete(sessionId);
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'SMS code expired'
        }
      });
    }

    // In development, accept any code. In production, verify the code
    if (process.env.NODE_ENV !== 'development' && session.code !== code) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Invalid SMS code'
        }
      });
    }

    // Create user
    const user = new User({
      phoneNumber: session.phoneNumber,
      name: session.name,
      userType: session.userType,
      verified: true
    });

    await user.save();
    smsStorage.delete(sessionId);

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
        userType: user.userType
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message
      }
    });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Phone number is required'
        }
      });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Generate SMS code
    const smsCode = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = `session_${Date.now()}_${Math.random()}`;

    smsStorage.set(sessionId, {
      phoneNumber,
      userId: user._id,
      code: smsCode,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    console.log(`📱 SMS Code for ${phoneNumber}: ${smsCode}`);

    res.status(200).json({
      success: true,
      message: 'SMS sent',
      sessionId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message
      }
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message
      }
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message
      }
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    // In production, upload to S3 or similar
    const { avatarUrl } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { 'profile.avatar': avatarUrl },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message
      }
    });
  }
};

module.exports = {
  register,
  verifySMS,
  login,
  getProfile,
  updateProfile,
  uploadAvatar
};
