
require('dotenv').config();
const mongoose = require('mongoose');
const Opportunity = require('./src/models/Opportunity');

const sampleOpportunities = [
  {
    title: 'Python Developer Intern',
    company: 'Tech Solutions',
    type: 'Internship',
    location: 'Remote',
    skills: ['Python', 'SQL', 'Git'],
    description: 'Learn Python development and work on practical software projects.'
  },
  {
    title: 'Frontend Developer Intern',
    company: 'WebWorks',
    type: 'Internship',
    location: 'Remote',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    description: 'Build responsive web pages and learn React development.'
  },
  {
    title: 'Data Analyst',
    company: 'Insight Analytics',
    type: 'Full-time',
    location: 'Ahmedabad',
    skills: ['Python', 'SQL', 'Excel'],
    description: 'Analyze datasets and prepare reports to support business decisions.'
  },
  {
    title: 'Part-Time Web Developer',
    company: 'Digital Studio',
    type: 'Part-time',
    location: 'Remote',
    skills: ['JavaScript', 'React', 'Node.js'],
    description: 'Help develop and maintain web applications.'
  },
  {
    title: 'Machine Learning Intern',
    company: 'AI Labs',
    type: 'Internship',
    location: 'Remote',
    skills: ['Python', 'Pandas', 'Scikit-learn'],
    description: 'Explore datasets and build introductory machine learning models.'
  }
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career_launch'
    );

    const count = await Opportunity.countDocuments();

    if (count > 0) {
      console.log(`Database already contains ${count} opportunities. No changes made.`);
      return;
    }

    await Opportunity.insertMany(sampleOpportunities);
    console.log('Successfully added 5 sample opportunities.');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();