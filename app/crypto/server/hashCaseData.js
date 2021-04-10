import sha1 from 'sha1';

import { Cases } from '../../model';

export const hashCaseData = (caseId) => {
	const caseData = Cases.findByCaseId(caseId).fetch()[0];
	const hash = sha1(JSON.stringify(caseData));

	return Cases.updateHashByCaseId(caseId, hash);
};
