import { Base } from '../_Base';

class Cases extends Base {
	constructor() {
		super('case');
	}

	findByFilter(filter) {
		const { patientId, state, expert } = filter;
		const query = {};
		const sort = {
			submitTime: -1,
		};

		if (patientId) {
			query.patientId = patientId;
		}

		if (state) {
			query.state = state;
		}

		if (expert) {
			query.relabelRole = 'expert';
			query.relabelResult = {
				$exists: false,
			};
		}

		return this.model.find(query, { sort });
	}

	findAllCase() {
		const query = {};
		return this.model.find(query);
	}
}

export default new Cases();
