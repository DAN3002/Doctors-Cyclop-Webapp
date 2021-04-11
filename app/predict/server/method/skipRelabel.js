import { Meteor } from 'meteor/meteor';

import { Submits, Cases } from '../../../model';
import { LABEL_LIST } from '../../../enum/LABEL_LIST';
import { Setting } from '../../../setting/server/lib/Setting';
import { hashSubmitData } from '../../../crypto';


Meteor.methods({
	'predict:skipRelabel'({ caseId, doctorEmail, type }) {
		const maxSpecialistSkip = Setting.getSetting('maxSpecialistSubmit') || 1;

		const comment = 'SKIP';
		const labels = {};
		for (const label of LABEL_LIST) {
			labels[label] = false;
		}
		const caseData = Cases.findByCaseId(caseId).fetch()[0] || {};
		const isOwner = doctorEmail === caseData.doctorEmail;

		const submitId = Submits.add(caseId, doctorEmail, type, labels, comment, isOwner);
		hashSubmitData(submitId);

		if (type === 'Specialist') {
			const count = Submits.countSubmitOfCaseByRole(caseId, 'Specialist', true);
			if (count >= maxSpecialistSkip) {
				Cases.updateRelabelToExpert(caseId);
			}
		}

		return true;
	},
});
