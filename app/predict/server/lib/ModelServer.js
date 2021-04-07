// import axios from 'axios';

// import { Setting } from '../../'

const SIMPLE_RESULT = {
	'ETT - Abnormal': {
		score: 0.23,
		label: true,
	},
	'ETT - Borderline': {
		score: 0.23,
		label: false,
	},
	'ETT - Normal': {
		score: 0.23,
		label: false,
	},
	'NGT - Abnormal': {
		score: 0.23,
		label: true,
	},
	'NGT - Borderline': {
		score: 0.23,
		label: false,
	},
	'NGT - Incompletely Imaged': {
		score: 0.23,
		label: true,
	},
	'NGT - Normal': {
		score: 0.23,
		label: false,
	},
	'CVC - Abnormal': {
		score: 0.23,
		label: true,
	},
	'CVC - Borderline': {
		score: 0.23,
		label: false,
	},
	'CVC - Normal': {
		score: 0.23,
		label: true,
	},
	// 'Swan Ganz Catheter Present': {
	// 	score: 0.23,
	// 	label: true,
	// },
};

export const ModelServer = {
	async getAIPredict(caseList) {
		// const apiUrl = Setting.getSetting('modelServerUrl');
		// return axios.post(apiUrl, { caseList });
		return new Promise((resolve) => {
			const result = caseList.map((el) => ({
				caseId: el.caseId,
				...SIMPLE_RESULT,
			}));
			setTimeout(() => {
				resolve({ result });
			}, caseList.length * 1000);
		});
	},
};
