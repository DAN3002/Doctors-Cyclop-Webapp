import { Template } from 'meteor/templating';

import {
	StateChart,
	settingChart,
	StatusChart,
	CountCaseChart,
} from '../../../../chart';
import { Cases } from '../../../../model';

import './sumary.html';

let stateChart;
let statusChart;
let countCaseChart;

Template.sumary.onRendered(function() {
	settingChart();
	stateChart = new StateChart('state-chart');
	statusChart = new StatusChart('status-chart');
	countCaseChart = new CountCaseChart('count-case-chart');

	const caseSub = this.subscribe('allCase');
	this.autorun(() => {
		if (caseSub.ready()) {
			const caseData = Cases.findAllCase().fetch();
			const last7DaysCases = Cases.findLast7DaysCases().fetch();

			stateChart.updateData(caseData);
			statusChart.updateData(caseData);
			countCaseChart.updateData(last7DaysCases);
		}
	});
});
