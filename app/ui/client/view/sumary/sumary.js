import { Template } from 'meteor/templating';

import {
	StateChart,
	settingChart,
	StatusChart,
} from '../../../../chart';
import { Cases } from '../../../../model';

import './sumary.html';

let stateChart;
let statusChart;

Template.sumary.onRendered(function() {
	settingChart();
	stateChart = new StateChart('state-chart');
	statusChart = new StatusChart('status-chart');

	const caseSub = this.subscribe('allCase');
	this.autorun(() => {
		if (caseSub.ready()) {
			const caseData = Cases.findAllCase().fetch();

			stateChart.updateData(caseData);
			statusChart.updateData(caseData);
		}
	});
});
