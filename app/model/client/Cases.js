import { Base } from '../_Base';

class Cases extends Base {
	constructor() {
		super('case');
	}

	findByFilter(filter) {
		const { patientId, state } = filter;
		const query = {};

		if (patientId) {
			query.patientId = patientId;
		}

		if (state) {
			query.state = state;
		}

		return this.model.find(query);
	}

	findAllCase() {
		const query = {};
		return this.model.find(query);
	}
}

export default new Cases();
