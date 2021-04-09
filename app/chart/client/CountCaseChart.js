import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from 'moment';

import { ChartBase } from './ChartBase';

const backgroundColor = [
	'rgba(190, 239, 178, 0.6)',
];

let labels = [1, 2, 3, 4, 5, 6, 7];

const initData = {
	labels,
	datasets: [{
		label: 'Case in last 7 days',
		data: [65, 59, 80, 81, 56, 55, 40],
		backgroundColor,
	}],
};

const options = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

export class CountCaseChart extends ChartBase {
	constructor(dom) {
		super(initData, 'bar', dom, options);
	}

	getCountMap(caseList) {
		const dateCount = caseList.map((el) => moment(el.submitTime).format('DD/MM/YYYY'));

		const countMap = new Map();
		const current = new Date(new Date().setHours(0, 0, 0, 0));
		const oneDay = 60 * 60 * 24 * 1000;
		for (let i = 0; i < 7; i++) {
			countMap.set(moment(new Date(current - oneDay * i)).format('DD/MM/YYYY'), 0);
		}

		for (const date of dateCount) {
			countMap.set(date, countMap.get(date) + 1);
		}
		return countMap;
	}

	updateData(raw) {
		const counts = Array.from(this.getCountMap(raw));
		counts.sort((a, b) => new Date(a[0]) - new Date(b[0]));

		const labelsDate = counts.map((el) => el[0]);
		const data = counts.map((el) => el[1]);

		labels = labelsDate;

		this.chart.data.datasets[0].data = data;
		this.chart.data.labels = labelsDate;

		this.chart.update();
	}

	onClickItem(evt, item) {
		if (item.length) {
			const date = labels[item[0].index];
			const query = {
				all: true,
				date,
			};
			FlowRouter.go('/', {}, query);
		}
	}
}
