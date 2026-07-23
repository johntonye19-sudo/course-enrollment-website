const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  credits: {
    type: Number,
    required: true
  },
  department: String,
  faculty: String,
  semester: {
    type: String,
    enum: ['1', '2'],
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  level: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  schedule: {
    day: String,
    time: String,
    location: String
  },
  maxCapacity: Number,
  currentEnrollment: {
    type: Number,
    default: 0
  },
  prerequisites: [String],
  courseType: {
    type: String,
    enum: ['core', 'elective', 'general'],
    default: 'core'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
