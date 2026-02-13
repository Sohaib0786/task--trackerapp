const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const ErrorResponse = require('../utils/errorResponse');

/**
 * =========================================================
 * @desc    Register New User
 * @route   POST /api/auth/register
 * @access  Public
 * =========================================================
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return next(new ErrorResponse('Please provide name, email and password', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('User already exists with this email', 400));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        token,
      },
    });

  } catch (error) {
    console.error('❌ Register Error:', error.message);

    // Handle duplicate key error (MongoDB)
    if (error.code === 11000) {
      return next(new ErrorResponse('Email already exists', 400));
    }

    next(error);
  }
};


/**
 * =========================================================
 * @desc    Login User
 * @route   POST /api/auth/login
 * @access  Public
 * =========================================================
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        token,
      },
    });

  } catch (error) {
    console.error('❌ Login Error:', error.message);
    next(error);
  }
};


/**
 * =========================================================
 * @desc    Get Logged-in User
 * @route   GET /api/auth/me
 * @access  Private
 * =========================================================
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error('❌ GetMe Error:', error.message);
    next(error);
  }
};


/**
 * =========================================================
 * @desc    Update User Profile
 * @route   PUT /api/auth/profile
 * @access  Private
 * =========================================================
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
      avatar: req.body.avatar,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });

  } catch (error) {
    console.error('❌ UpdateProfile Error:', error.message);
    next(error);
  }
};


/**
 * =========================================================
 * @desc    Update User Password
 * @route   PUT /api/auth/password
 * @access  Private
 * =========================================================
 */
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(new ErrorResponse('Please provide both current and new password', 400));
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return next(new ErrorResponse('Current password is incorrect', 401));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      data: { token },
    });

  } catch (error) {
    console.error('❌ UpdatePassword Error:', error.message);
    next(error);
  }
};
