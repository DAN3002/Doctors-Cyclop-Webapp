import { Base } from '../_Base';

class Submits extends Base {
	constructor() {
		super('submit');
	}

	add(caseId, doctorEmail, type, labels, comment) {
		const insert = {
			caseId,
			doctorEmail,
			type,
			labels,
			comment,
			submitTime: new Date(),
			skip: comment === 'SKIP',
		};

		return this.model.insert(insert);
	}

	findByCaseId(caseId) {
		const query = {
			caseId,
		};

		return this.model.find(query);
	}

	countSubmitOfCaseByRole(caseId, role, isSkip) {
		const query = {
			caseId,
			type: role,
			skip: isSkip,
		};

		return this.model.find(query).count();
	}
}

export default new Submits();
