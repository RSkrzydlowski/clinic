const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
const convertHour = require('../services/hour');
const address = process.env.APP_URL || 'http://localhost:3000';
const nodemailer = require('nodemailer');

router.post('/send-email-reset-password', async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.json({
			success: false,
			error: 'Fill in the e-mail field'
		});
	}
	User.findOne({ email }, async (err, user) => {
		if (err) return res.json({ success: false, error: err });
		if (user) {
			const reset = new ResetPassword();
			reset.user = user._id;
			reset.date = new Date().getTime();

			reset.save((err, resetData) => {
				if (err) return res.json({ success: false, error: err });
				const emailData = {
					email,
					userName: u.name,
					address,
					userId: u._id,
					resetId: resetDataId
				};
				const mailOptions = emailModule.resetPasswordEmail(emailData);
				sendEmail(mailOptions);
			});
		} else {
			return res.json({ success: false, error: 'Incorrect email or password' });
		}
	});
});

module.exports = router;
