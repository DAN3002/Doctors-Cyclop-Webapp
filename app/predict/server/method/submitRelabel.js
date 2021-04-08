import { Meteor } from 'meteor/meteor';

import { Submits, Cases } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';
import { Setting } from '../../../setting/server/lib/Setting';

Meteor.methods({
	'predict:submitRelabel'({ caseId, doctorEmail, type, selectedLabels, comment }) {
		const maxSpecialistSubmit = Setting.getSetting('maxSpecialistSubmit') || 1;

		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = selectedLabels.includes(label);
		}
		const caseData = Cases.findByCaseId(caseId).fetch()[0] || {};
		const isOwner = doctorEmail === caseData.doctorEmail;

		Submits.add(caseId, doctorEmail, type, labels, comment, isOwner);

		if (type === 'Expert') {
			Cases.updateRelabelResult(caseId, labels);
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
