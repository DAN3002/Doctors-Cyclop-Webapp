import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Cases } from '../../../model';
import { getUserEmail } from '../../../lib/client/getUserEmail';
import { STATE } from '../../../enum/STATE';
import './patientList.html';

Template.patientList.helpers({
	casesList() {
		return Template.instance().casesList.get();
	},
	states() {
		return STATE;
	},
	isSelectedState(currentState) {
		const { state } = FlowRouter.current().queryParams;
		return state === currentState;
	},
	filterQuery() {
		return FlowRouter.current().queryParams;
	},
});

Template.patientList.events({
	'click #findBtn'() {
		const patientId = $('#patientIdInput').val();
		const state = $('#patientState').val();
		const filter = {};

		if (patientId && patientId.length) {
			filter.patientId = patientId;
		}

		if (state !== 'All') {
			filter.state = state;
		}

		Template.instance().filter.set(filter);
	},
});

Template.patientList.onCreated(function() {
	this.casesList = new ReactiveVar([]);
	this.filter = new ReactiveVar(FlowRouter.current().queryParams);

	const caseSub = this.subscribe('caseByDoctorEmail', getUserEmail());
	this.autorun(() => {
		if (caseSub.ready()) {
			const data = Cases.findByFilter(this.filter.get()).fetch();
			this.casesList.set(data);
		}
	});
});
