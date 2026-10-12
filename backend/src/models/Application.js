const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  status: { type: String, enum: ['Applied', 'Shortlisted', 'Interview', 'Rejected', 'Selected'], default: 'Applied' }
}, { timestamps: true });
applicationSchema.index({ student: 1, opportunity: 1 }, { unique: true });
module.exports = mongoose.model('Application', applicationSchema);
