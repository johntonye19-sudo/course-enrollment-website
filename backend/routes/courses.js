const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { semester, level, department, academicYear } = req.query;
    let query = { active: true };

    if (semester) query.semester = semester;
    if (level) query.level = level;
    if (department) query.department = department;
    if (academicYear) query.academicYear = academicYear;

    const courses = await Course.find(query).populate('instructor', 'firstName lastName');
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'firstName lastName');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { code, title, description, credits, department, faculty, semester, academicYear, level } = req.body;

    let course = new Course({
      code,
      title,
      description,
      credits,
      department,
      faculty,
      semester,
      academicYear,
      level
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;