const express = require('express');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const router = express.Router();

router.get('/enrollments', async (req, res) => {
  try {
    const { status, semester, academicYear } = req.query;
    let query = {};

    if (status) query.status = status;
    if (semester) query.semester = semester;
    if (academicYear) query.academicYear = academicYear;

    const enrollments = await Enrollment.find(query)
      .populate('student', 'firstName lastName email matricNumber')
      .populate('courses', 'code title credits')
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats/dashboard', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments({ active: true });
    const pendingEnrollments = await Enrollment.countDocuments({ status: 'pending' });
    const approvedEnrollments = await Enrollment.countDocuments({ status: 'approved' });

    res.json({
      totalStudents,
      totalCourses,
      pendingEnrollments,
      approvedEnrollments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/enrollments/:id/approve', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'approved',
        approvalDate: Date.now(),
        updatedAt: Date.now()
      },
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