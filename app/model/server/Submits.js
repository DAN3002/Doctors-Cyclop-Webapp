import { Base } from '../_Base';

class Submits extends Base {
	constructor() {
		super('submit');
	}

	add(caseId, doctorEmail, type, labels, comment, isOwner) {
		const insert = {
			caseId,
			doctorEmail,
			type,
			labels,
			comment,
			submitTime: new Date(),
			isOwner,
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

	findAll() {
		const query = {};
		return this.model.find(query);
	}
}

export default new Submits();
