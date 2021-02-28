exports.activateAccountEmail = (email, userName, address, _id) => {
	const mailOptions = {
		to: email,
		subject: 'Activate account',
		html: `<h1>Hi ${userName}</h1>
  <p>To complete the account registration, just click on this <a href=${address}/activate/${_id}>link</a></p>`
	};
	return mailOptions;
};
