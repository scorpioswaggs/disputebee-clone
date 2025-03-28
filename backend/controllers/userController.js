const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // Check if user exists
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (user) {
    res.json({
      success: true,
      user,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    
    const updatedUser = await user.save();
    
    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Please provide current and new password');
  }
  
  const user = await User.findById(req.user._id);
  
  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    
    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  } else {
    res.status(401);
    throw new Error('Current password is incorrect');
  }
});

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400);
    throw new Error('Please provide an email address');
  }
  
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(404);
    throw new Error('No user found with that email address');
  }
  
  // Generate reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  
  // TODO: Send email with reset token
  
  res.json({
    success: true,
    message: 'Password reset email sent',
  });
});

// @desc    Reset password
// @route   POST /api/users/reset-password/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  
  if (!password) {
    res.status(400);
    throw new Error('Please provide a new password');
  }
  
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  
  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired reset token');
  }
  
  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  
  res.json({
    success: true,
    message: 'Password reset successful',
  });
});

// @desc    Verify email
// @route   GET /api/users/verify-email/:verificationToken
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  
  const user = await User.findOne({
    emailVerificationToken: verificationToken,
  });
  
  if (!user) {
    res.status(400);
    throw new Error('Invalid verification token');
  }
  
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
  
  res.json({
    success: true,
    message: 'Email verified successfully',
  });
});

// @desc    Update notification preferences
// @route   PUT /api/users/notification-preferences
// @access  Private
const updateNotificationPreferences = asyncHandler(async (req, res) => {
  const { emailNotifications, smsNotifications, marketingEmails } = req.body;
  
  const user = await User.findById(req.user._id);
  
  if (user) {
    user.notificationPreferences = {
      emailNotifications: emailNotifications !== undefined ? emailNotifications : user.notificationPreferences.emailNotifications,
      smsNotifications: smsNotifications !== undefined ? smsNotifications : user.notificationPreferences.smsNotifications,
      marketingEmails: marketingEmails !== undefined ? marketingEmails : user.notificationPreferences.marketingEmails,
    };
    
    await user.save();
    
    res.json({
      success: true,
      notificationPreferences: user.notificationPreferences,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateNotificationPreferences,
};
