// Dalam file system/models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  apiKey: String,
  premium: { type: Boolean, default: false },
  premiumTime: { type: Number, default: 0 },
  limit: { type: Number, default: 1000 },
  defaultKey: String,
  profile: String,
  isAdmin: { type: Boolean, default: false }, // Field baru
  otp: String,
  otpExpires: Date,
  loginOtp: String,
  loginOtpExpires: Date,
  apiKeyChangeOtp: String,
  apiKeyChangeOtpExpires: Date,
  telegramChatId: String,
  pendingApiKey: String,
  totalRequests: { type: Number, default: 0 },
  ipAddress: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
