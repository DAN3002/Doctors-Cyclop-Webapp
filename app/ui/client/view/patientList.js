import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveVar } from 'meteor/reactive-var';

import './patientList.html';

const Cases = new Mongo.Collection('case');

Template.patientList.helpers({
	casesList() {
		return Template.instance().casesList.get();
	},
});

Template.patientList.onCreated(function() {
	this.casesList = new ReactiveVar([]);

	const caseSub = this.subscribe('caseByDoctorId', 'dan');
	this.autorun(() => {
		if (caseSub.ready()) {
			const data = Cases.find({}).fetch();
			this.casesList.set(data);
		}
	});
});
