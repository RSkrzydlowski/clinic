exports.activateAccountEmail = (emailData) => {
	const mailOptions = {
		to: emailData.email,
		subject: 'Activate account',
		html: `<h1>Hi ${emailData.userName}</h1>
  <p>To complete the account registration, just click on this <a href=${emailData.address}/activate/${emailData.userId}>link</a></p>`
	};
	return mailOptions;
};

exports.resetPasswordEmail = (emailData) => {
	const mailOptions = {
		to: emailData.email,
		subject: 'Reset password',
		html: `<h1>Hi ${emailData.userName}</h1>
	<p>It has been reported that you forgot your password to your account, to reset your password go to the link below. If that's not you, ignore this message. <a href=${emailData.address}/reset-password/${emailData.userId}/${emailData.resetId}>link</a></p>`
	};
	return mailOptions;
};
