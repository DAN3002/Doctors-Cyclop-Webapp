import { Meteor } from 'meteor/meteor';

import { Cases } from '../../../model';

Meteor.methods({
	'predict:startRelabel'(caseId) {
		Cases.startRelabel(caseId);
	},
});
