const generateTime = require('./generateTime');

const convertHour = (time) => {
	if (!time) {
		return 'Nigdy';
	}
	const date = new Date(time);
	const hour = generateTime(date.getHours());
	const minute = generateTime(date.getMinutes());
	const dateToDisplay = hour + ':' + minute;
	return dateToDisplay;
};

module.exports = convertHour;
