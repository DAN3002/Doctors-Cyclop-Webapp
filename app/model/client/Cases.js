import moment from 'moment';

import { Base } from '../_Base';

class Cases extends Base {
	constructor() {
		super('case');
	}

	findByFilter(filter) {
		const { patientId, state, expert, status, date } = filter;
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

		if (status) {
			query.status = status;
		}

		if (expert) {
			query.relabelRole = 'expert';
			query.relabelResult = {
				$exists: false,
			};
		}

		if (date) {
			const start = moment(date, 'DD/MM/YYYY').toDate();
			const end = new Date(start.getTime() + (60 * 60 * 24 * 1000));
			query.submitTime = {
				$gte: start,
				$lte: end,
			};
		}

		return this.model.find(query, { sort });
	}

	findAllCase() {
		const query = {};
		return this.model.find(query);
	}

	findLast7DaysCases() {
		const minusDate = 60 * 60 * 24 * 1000 * 6;
		const minDate = new Date(new Date().setHours(0, 0, 0, 0) - minusDate);

		const query = {
			submitTime: {
				$gte: minDate,
			},
		};

		return this.model.find(query);
	}

	countRelabelling() {
		const query = {
			status: 'Relabelling',
		};

		return this.model.find(query).count();
	}
}

export default new Cases();
