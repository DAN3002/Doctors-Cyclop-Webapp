import { Meteor } from 'meteor/meteor';

import { Submits } from '../../app/model';

Meteor.publish('submitByCaseId', function(caseId) {
	return Submits.findByCaseId(caseId);
});

Meteor.publish('allSubmits', function() {
	return Submits.findAll(Meteor.users.find({}));
});
