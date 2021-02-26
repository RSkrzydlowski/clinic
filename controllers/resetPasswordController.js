const express = require('express');
const router = express.Router();
const User = require('../models/user');
const convertHour = require('../services/hour');
const address = process.env.APP_URL || 'http://localhost:3000';

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
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.EMAIL_ADDRESS,
						pass: process.env.EMAIL_PASSWORD
					}
				});
				console.log(address);

				const mailOptions = {
					from: process.env.EMAIL_ADDRESS,
					to: email,
					subject: 'Reset password',
					html: `<h1>Hi ${u.name}</h1>
        <p>It has been reported that you forgot your password to your account, to reset your password go to the link below. If that's not you, ignore this message. <a href=${address}/reset-password/${u._id}/${resetData._id}>link</a></p>`
				};

				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
			});
		} else {
			return res.json({ success: false, error: 'Incorrect email or password' });
		}
	});
});

module.exports = router;
