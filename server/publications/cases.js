import { Meteor } from 'meteor/meteor';

import { Cases } from '../../app/model';

Meteor.publish('caseByDoctorId', function(doctorId) {
	return Cases.findCaseByDoctorId(doctorId);
});

Meteor.publish('caseByCaseId', function(caseId) {
	return Cases.findByCaseId(caseId);
});
