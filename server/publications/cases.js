import { Meteor } from 'meteor/meteor';

import { Cases } from '../../app/model';

Meteor.publish('caseByDoctorEmail', function(doctorEmail) {
	return Cases.findCaseByDoctorEmail(doctorEmail);
});

Meteor.publish('caseByCaseId', function(caseId) {
	return Cases.findByCaseId(caseId);
});
