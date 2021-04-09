import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {
	StateChart,
	settingChart,
	StatusChart,
	CountCaseChart,
} from '../../../../chart';
import { Cases, Submits } from '../../../../model';

import './sumary.html';

let stateChart;
let statusChart;
let countCaseChart;


Template.sumary.helpers({
	userSubmitData() {
		return Template.instance().userSubmitData.get();
	},
	getArrow(userData) {
		return userData.submit >= userData.skip ? 'up' : 'down';
	},
});

Template.sumary.onCreated(function() {
	this.userSubmitData = new ReactiveVar([]);
});

Template.sumary.onRendered(function() {
	settingChart();
	stateChart = new StateChart('state-chart');
	statusChart = new StatusChart('status-chart');
	countCaseChart = new CountCaseChart('count-case-chart');

	const caseSub = this.subscribe('allCase');
	const submitSub = this.subscribe('allSubmits');
	const userSub = this.subscribe('allUsers');

	this.autorun(() => {
		if (caseSub.ready()) {
			const caseData = Cases.findAllCase().fetch();
			const last7DaysCases = Cases.findLast7DaysCases().fetch();

			stateChart.updateData(caseData);
			statusChart.updateData(caseData);
			countCaseChart.updateData(last7DaysCases);
		}
	});

	this.autorun(() => {
		if (userSub.ready() || submitSub.ready()) {
			const userSubmitData = [];
			const userList = Meteor.users.find({}).fetch();

			for (const user of userList) {
				const doctorEmail = user.emails[0].address;
				const [submit, skip] = Submits.countCaseDataByUserEmail(doctorEmail);

				userSubmitData.push({
					username: user.username,
					submit,
					skip,
				});
			}

			this.userSubmitData.set(userSubmitData);
		}
	});
});
