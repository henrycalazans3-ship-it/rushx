const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    sparse: true
  },
  userType: {
    type: String,
    enum: ['client', 'biker'],
    required: true
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  profile: {
    avatar: String,
    verified: Boolean,
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
