import { FlowRouter } from 'meteor/kadira:flow-router';

import { ChartBase } from './ChartBase';
import { ChartEnum } from '../../enum/ChartEnum';

const backgroundColor = [
	'#01228f',
	'#1F2124',
	'#478a21',
	'#bd271c',
	'#b05c13',
];

const labels = ChartEnum.STATE_CHART_LABELS;

const initData = {
	labels,
	datasets: [{
		data: Array(labels.length).fill(10),
		backgroundColor,
		hoverOffset: 4,
	}],
};

export class StateChart extends ChartBase {
	constructor(dom) {
		super(initData, 'pie', dom);
	}

	processData(caseList) {
		const countMap = new Map();
		for (const caseData of caseList) {
			countMap.set(caseData.state, (countMap.get(caseData.state) || 0) + 1);
		}
		return ChartEnum.STATE_CHART_LABELS.map((el) => countMap.get(el) || 0);
	}

	onClickItem(evt, item) {
		const state = labels[item[0].index];

		const query = {
			all: true,
			state,
		};
		FlowRouter.go('/', {}, query);
	}
}
