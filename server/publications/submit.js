import { Meteor } from 'meteor/meteor';

import { Submits } from '../../app/model';

Meteor.publish('submitByCaseId', function(caseId) {
	return Submits.findByCaseId(caseId);
});
