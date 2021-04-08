import { Meteor } from 'meteor/meteor';

import { Cases } from '../../../model';
import { ModelServer } from '../lib/ModelServer';

Meteor.methods({
	async 'predict:createNewCase'(caseListData, doctorEmail) {
		const caseList = [];
		for (const caseData of caseListData) {
			const { patientId, url, fileName } = caseData;
			const caseId = Cases.add(patientId, doctorEmail, url, fileName);

			caseList.push({
				caseId, url,
			});
		}
		const AIPredict = (await ModelServer.getAIPredict(caseList) || {}).data?.result || [];
		for (const result of AIPredict) {
			Cases.updateAIResult(result);
		}
	},
});
