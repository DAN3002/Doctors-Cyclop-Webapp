import { FlowRouter } from 'meteor/kadira:flow-router';

import { ChartBase } from './ChartBase';
import { ChartEnum } from '../../enum/ChartEnum';

const backgroundColor = [
	'#DDEB58',
	'#196361',
	'#9E3933',
];

const labels = ChartEnum.STATUS_CHART_LABELS;

const initData = {
	labels,
	datasets: [{
		data: Array(labels.length).fill(10),
		backgroundColor,
		hoverOffset: 4,
	}],
};

export class StatusChart extends ChartBase {
	constructor(dom) {
		super(initData, 'pie', dom);
	}

	processData(caseList) {
		const countMap = new Map();
		for (const caseData of caseList) {
			countMap.set(caseData.status, (countMap.get(caseData.status) || 0) + 1);
		}
		return ChartEnum.STATUS_CHART_LABELS.map((el) => countMap.get(el) || 0);
	}

	onClickItem(evt, item) {
		const status = labels[item[0].index];

		const query = {
			all: true,
			status,
		};
		FlowRouter.go('/', {}, query);
	}
}
