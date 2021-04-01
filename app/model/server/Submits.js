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
		};

		return this.model.insert(insert);
	}
}

export default new Submits();
