const router = require('express').Router();
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const { protect, adminOnly } = require('../middleware/auth');
router.post('/:opportunityId', protect, async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.opportunityId);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found.' });
    const existing = await Application.findOne({ student: req.user.id, opportunity: opportunity.id });
    if (existing) return res.status(409).json({ message: 'You already applied to this opportunity.' });
    const app = await Application.create({ student: req.user.id, opportunity: opportunity.id });
    res.status(201).json(app);
  } catch (err) { next(err); }
});
router.get('/my', protect, async (req, res, next) => {
  try { res.json(await Application.find({ student: req.user.id }).populate('opportunity').sort({ createdAt: -1 })); }
  catch (err) { next(err); }
});
router.patch('/:id/status', protect, adminOnly, async (req, res, next) => {
  try {
    const allowed = ['Applied', 'Shortlisted', 'Interview', 'Rejected', 'Selected'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status.' });
    const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('opportunity');
    if (!app) return res.status(404).json({ message: 'Application not found.' });
    res.json(app);
  } catch (err) { next(err); }
});
module.exports = router;
