const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');
const { Op } = require('sequelize');

exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userRole = role === 'admin' ? 'admin' : 'user';
    const user = await User.create({ username, email, password: hashedPassword, role: userRole });
    res.status(201).json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 4800000);
    await user.update({ resetToken, resetTokenExpiry });
    await emailService.sendPasswordResetEmail(user.email, resetToken);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: new Date() }
      }
    });
    if (!user) return res.status(400).json({ error: 'Invalid or expired reset token' });
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await user.update({ password: hashedPassword, resetToken: null, resetTokenExpiry: null });
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    next(error);
  }
};
