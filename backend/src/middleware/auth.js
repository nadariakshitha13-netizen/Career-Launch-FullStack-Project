const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Please log in first.' });
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'dev_only_secret');
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'Account not found.' });
    req.user = user; next();
  } catch (_err) { return res.status(401).json({ message: 'Invalid or expired token.' }); }
};
exports.adminOnly = (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required.' });
