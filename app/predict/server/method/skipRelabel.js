import { Meteor } from 'meteor/meteor';

import { Submits } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';

Meteor.methods({
	'predict:skipRelabel'({ caseId, doctorEmail, type }) {
		const comment = 'SKIP';
		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = false;
		}

		Submits.add(caseId, doctorEmail, type, labels, comment);
		return true;
	},
});
