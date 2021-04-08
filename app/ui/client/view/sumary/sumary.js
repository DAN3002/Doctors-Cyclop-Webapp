import { Template } from 'meteor/templating';

import {
	StateChart,
	settingChart,
} from '../../../../chart';
import { Cases } from '../../../../model';

import './sumary.html';

let stateChart;

Template.sumary.onRendered(function() {
	settingChart();
	stateChart = new StateChart('state-chart');

	const caseSub = this.subscribe('allCase');
	this.autorun(() => {
		if (caseSub.ready()) {
			const caseData = Cases.findAllCase().fetch();

			stateChart.updateData(caseData);
		}
	});
});
