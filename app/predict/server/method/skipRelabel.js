import { Meteor } from 'meteor/meteor';

import { Submits, Cases } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';

Meteor.methods({
	'predict:skipRelabel'({ caseId, doctorEmail, type }) {
		const maxSpecialistSkip = 1;

		const comment = 'SKIP';
		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = false;
		}

		if (type === 'Specialist') {
			const count = Submits.countSubmitOfCaseByRole(caseId, 'Specialist', true);
			console.log('skip', count);
			if (count >= maxSpecialistSkip) {
				Cases.updateRelabelToExpert(caseId);
			}
		}

		Submits.add(caseId, doctorEmail, type, labels, comment);
		return true;
	},
});
