const generateTime = (time) => {
	if (time < 10) {
		time = '0' + time;
	}
	return time;
};

module.exports = generateTime;
