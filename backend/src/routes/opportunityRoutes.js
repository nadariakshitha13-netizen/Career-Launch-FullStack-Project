const router = require('express').Router();
const Opportunity = require('../models/Opportunity');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type && ['Internship', 'Full-time', 'Part-time'].includes(req.query.type)) filter.type = req.query.type;
    if (req.query.q) filter.$or = ['title', 'company', 'location', 'skills'].map(key => ({ [key]: { $regex: req.query.q, $options: 'i' } }));
    res.json(await Opportunity.find(filter).sort({ createdAt: -1 }).limit(100));
  } catch (err) { next(err); }
});
router.post('/', protect, adminOnly, async (req, res, next) => {
  try { const item = await Opportunity.create({ ...req.body, createdBy: req.user.id }); res.status(201).json(item); }
  catch (err) { next(err); }
});
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try { const item = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: 'Opportunity not found.' }); res.json(item); }
  catch (err) { next(err); }
});
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try { const item = await Opportunity.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Opportunity not found.' }); res.json({ message: 'Opportunity deleted.' }); }
  catch (err) { next(err); }
});
module.exports = router;
