import { Meteor } from 'meteor/meteor';

import { Submits } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';

Meteor.methods({
	'predict:submitRelabel'({ caseId, doctorEmail, type, selectedLabels, comment }) {
		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = selectedLabels.includes(label);
		}

		Submits.add(caseId, doctorEmail, type, labels, comment);
		return true;
	},
});
