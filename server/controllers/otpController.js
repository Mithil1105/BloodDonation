const Otps = require('../models/otpModel.js');
const randomstring = require('randomstring');
const sendEmail = require('../config/sendEmails.js')

function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

exports.sendOTP = async (req, res, next) => {
    try {
        const email  = req.params.emailReg;
        console.log(email)
        const otp = generateOTP();
        const newOTP = new Otps({ email, otp });
        await newOTP.save();

        await sendEmail({
             to: email,
             subject: 'Your OTP',
             message: `<p>Your DonateNow OTP is: <strong>${otp}</strong></p>`,
         });

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

exports.verifyOTP = async (req, res, next) => {
    try {
        const email = req.params.emailReg;
        const otp = req.params.otp;
        console.log('Inside verify');
        const existingOTP = await Otps.findOneAndDelete({ email, otp });

        if (existingOTP) {
            // OTP is valid
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            // OTP is invalid
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};