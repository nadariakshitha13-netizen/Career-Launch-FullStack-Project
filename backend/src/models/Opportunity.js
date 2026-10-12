const mongoose = require('mongoose');
const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  type: { type: String, enum: ['Internship', 'Full-time', 'Part-time'], default: 'Internship' },
  location: { type: String, default: 'Remote' },
  skills: [{ type: String, trim: true }],
  description: { type: String, required: true },
  applyBy: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Opportunity', opportunitySchema);
