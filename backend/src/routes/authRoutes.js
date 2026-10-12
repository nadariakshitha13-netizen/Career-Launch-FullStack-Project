const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const makeToken = id => jwt.sign({ id }, process.env.JWT_SECRET || 'dev_only_secret', { expiresIn: '2d' });
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: 'Name, email and password (at least 8 characters) are required.' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email is already registered.' });
    const isConfiguredAdmin = email.toLowerCase() === (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase() && password === process.env.ADMIN_PASSWORD;
    const role = isConfiguredAdmin ? 'admin' : 'student';
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10), role });
    res.status(201).json({ token: makeToken(user.id), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
});
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Email or password is incorrect.' });
    res.json({ token: makeToken(user.id), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
});
router.get('/me', protect, (req, res) => res.json({ user: req.user }));
module.exports = router;
