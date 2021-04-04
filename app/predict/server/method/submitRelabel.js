import { Meteor } from 'meteor/meteor';

import { Submits, Cases } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';

Meteor.methods({
	'predict:submitRelabel'({ caseId, doctorEmail, type, selectedLabels, comment }) {
		const maxSpecialistSubmit = 1;

		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = selectedLabels.includes(label);
		}
		Submits.add(caseId, doctorEmail, type, labels, comment);

		if (type === 'Expert') {
			Cases.updateRelableResult(caseId, labels);
		} else {
			const count = Submits.countSubmitOfCaseByRole(caseId, 'Specialist', false);
			console.log(count);
			if (count >= maxSpecialistSubmit) {
				Cases.updateRelabelToExpert(caseId);
			}
		}

		return true;
	},
});
