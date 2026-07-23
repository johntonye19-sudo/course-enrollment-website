const express = require('express');
const Enrollment = require('../models/Enrollment');

const router = express.Router();

router.post('/initiate', async (req, res) => {
  try {
    const { enrollmentId, amount } = req.body;

    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { paymentStatus: 'pending', paymentAmount: amount },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({
      message: 'Payment initiated',
      enrollment,
      redirectUrl: 'https://payment-gateway.com/pay'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { enrollmentId, transactionRef } = req.body;

    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { 
        paymentStatus: 'paid',
        paymentDate: Date.now(),
        status: 'approved'
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({ message: 'Payment verified successfully', enrollment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;