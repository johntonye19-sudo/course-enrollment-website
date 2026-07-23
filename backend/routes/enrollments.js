const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const router = express.Router();

router.get('/student/:studentId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId })
      .populate('student', 'firstName lastName email')
      .populate('courses', 'code title credits');
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { student, courses, semester, academicYear } = req.body;

    let enrollment = new Enrollment({
      student,
      courses,
      semester,
      academicYear,
      status: 'pending'
    });

    await enrollment.save();
    await enrollment.populate('student courses');

    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;

    let enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status, notes, updatedAt: Date.now() },
      { new: true }
    ).populate('student courses');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;