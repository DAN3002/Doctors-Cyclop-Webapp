import { Meteor } from 'meteor/meteor';

import { Cases } from '../../../model';
import { ModelServer } from '../lib/ModelServer';

Meteor.methods({
	async 'predict:createNewCase'(caseListData, doctorEmail) {
		const caseList = [];
		for (const caseData of caseListData) {
			const { patientId, fileUrl } = caseData;
			const caseId = Cases.add(patientId, doctorEmail, fileUrl);

			caseList.push({
				caseId, fileUrl,
			});
		}

		const AIPredict = await ModelServer.getAIPredict(caseList);
		for (const result of AIPredict) {
			Cases.updateAIResult(result);
		}
	},
});
