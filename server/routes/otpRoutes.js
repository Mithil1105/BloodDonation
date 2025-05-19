const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/otpController');

const router = express.Router();

router.get('/sendOTP/:emailReg', sendOTP);
router.get('/verifyOTP/:emailReg/:otp', verifyOTP);

module.exports = router;