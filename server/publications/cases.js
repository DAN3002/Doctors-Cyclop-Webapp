import { Meteor } from 'meteor/meteor';

import { Cases } from '../../app/model';

Meteor.publish('caseByDoctorEmail', function(doctorEmail) {
	return Cases.findCaseByDoctorEmail(doctorEmail);
});

Meteor.publish('allCase', function() {
	return Cases.findAll();
});

Meteor.publish('needRelableCase', function() {
	return Cases.findCaseNeedRelable();
});

Meteor.publish('caseByCaseId', function(caseId) {
	return Cases.findByCaseId(caseId);
});
