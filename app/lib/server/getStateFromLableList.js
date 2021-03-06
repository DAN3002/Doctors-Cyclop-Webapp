export const getStateFromLableList = (labels) => {
	const list = Object.keys(labels).filter((key) => labels[key]);
	const stateSort = [
		'Borderline',
		'Abnormal',
		'Normal',
	];

	return stateSort.find((el) => list.some((label) => label.includes(el))) || 'Unknown';
};
