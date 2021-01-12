const convertDate = (time) => {
	if (!time) {
		return 'Nigdy';
	}
	const date = new Date(time);
	const day = generateTime(date.getDate());
	const month = generateTime(date.getMonth() + 1);
	const year = date.getFullYear();
	const hour = generateTime(date.getHours());
	const minute = generateTime(date.getMinutes());
	const second = generateTime(date.getSeconds());
	const dateToDisplay = day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second;
	return dateToDisplay;
};

const generateTime = (time) => {
	if (time < 10) {
		time = '0' + time;
	}
	return time;
};

export default { convertDate };
