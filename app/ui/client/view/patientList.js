import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Cases } from '../../../model';
import './patientList.html';

Template.patientList.helpers({
	casesList() {
		return Template.instance().casesList.get();
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
	this.filter = new ReactiveVar({});

	const caseSub = this.subscribe('caseByDoctorEmail', 'dinhanh300229@gmail.com');
	this.autorun(() => {
		if (caseSub.ready()) {
			const data = Cases.findByFilter(this.filter.get()).fetch();
			this.casesList.set(data);
		}
	});
});
