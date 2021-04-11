import { Meteor } from 'meteor/meteor';

import { Submits, Cases } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';
import { Setting } from '../../../setting/server/lib/Setting';
import { hashCaseData, hashSubmitData } from '../../../crypto';

Meteor.methods({
	'predict:submitRelabel'({ caseId, doctorEmail, type, selectedLabels, comment }) {
		const maxSpecialistSubmit = Setting.getSetting('maxSpecialistSubmit') || 1;

		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = selectedLabels.includes(label);
		}
		const caseData = Cases.findByCaseId(caseId).fetch()[0] || {};
		const isOwner = doctorEmail === caseData.doctorEmail;

		const submitId = Submits.add(caseId, doctorEmail, type, labels, comment, isOwner);
		hashSubmitData(submitId);

		if (type === 'Expert') {
			Cases.updateRelabelResult(caseId, labels);
			hashCaseData(caseId);
		} else {
			const count = Submits.countSubmitOfCaseByRole(caseId, 'Specialist', false);
			if (count >= maxSpecialistSubmit) {
				Cases.updateRelabelToExpert(caseId);
			}
		}

		return true;
	},
});
