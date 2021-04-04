import { Meteor } from 'meteor/meteor';

import { Cases } from '../../../model';

Meteor.methods({
	'predict:startRelable'(caseId) {
		Cases.startRelable(caseId);
	},
});
