import { Base } from '../_Base';

class Submits extends Base {
	constructor() {
		super('submit');
	}

	findAllSubmit() {
		const query = {};
		const sort = {
			submitTime: -1,
		};
		return this.model.find(query, { sort });
	}

	isHasOwnerSubmit() {
		const query = {
			isOwner: true,
		};
		return this.model.find(query).count() > 0;
	}

	countCaseDataByUserEmail(doctorEmail) {
		const querySubmit = {
			doctorEmail,
			skip: false,
		};
		const querySkip = {
			doctorEmail,
			skip: true,
		};

		return [
			this.model.find(querySubmit).count(),
			this.model.find(querySkip).count(),
		];
	}
}

export default new Submits();
