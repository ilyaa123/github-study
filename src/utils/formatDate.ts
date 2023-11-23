const formatDate = (dateString: string | Date, format: string) => {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) return 'Invalid Date';

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const formattedDate = format
		.replace('YYYY', String(year))
		.replace('MM', String(month < 10 ? '0' + month : month))
		.replace('DD', String(day < 10 ? '0' + day : day))
		.replace('HH', String(hours < 10 ? '0' + hours : hours))
		.replace('mm', String(minutes < 10 ? '0' + minutes : minutes))
		.replace('ss', String(seconds < 10 ? '0' + seconds : seconds));

	return formattedDate;
};

export default formatDate;
