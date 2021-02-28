const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD
	}
});

const sendEmail = (mailOptions) => {
	console.log(mailOptions);
	mailOptions.from = process.env.EMAIL_ADDRESS;
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(mailOptions);
			console.log('Email sent: ' + info.response);
		}
	});
};

module.exports = sendEmail;
