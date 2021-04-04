import { Base } from '../_Base';
import { getStateFromLableList } from '../../lib/server/getStateFromLableList';

class Cases extends Base {
	constructor() {
		super('case');
	}

	add(patientId, doctorEmail, imageUrl) {
		const insert = {
			patientId,
			doctorEmail,
			imageUrl,
			submitTime: new Date(),
			state: 'Waiting',
		};

		return this.model.insert(insert);
	}

	findCaseByDoctorEmail(doctorEmail) {
		const query = {
			doctorEmail,
		};

		return this.model.find(query);
	}

	findByCaseId(caseId) {
		const query = {
			_id: caseId,
		};
		return this.model.find(query);
	}

	findCaseNeedRelable() {
		const query = {
			relabel: true,
			relabelResult: {
				$exists: false,
			},
		};

		return this.model.find(query);
	}

	updateRelableResult(caseId, result) {
		const query = {
			_id: caseId,
		};
		const update = {
			$set: {
				relabelResult: result,
				state: getStateFromLableList(result),
			},
		};

		return this.model.update(query, update);
	}

	updateRelabelToExpert(caseId) {
		const query = {
			_id: caseId,
		};
		const update = {
			$set: {
				relabelRole: 'expert',
			},
		};

		return this.model.update(query, update);
	}

	startRelable(caseId) {
		const query = {
			_id: caseId,
		};
		const update = {
			$set: {
				relabel: true,
				relabelRole: 'specialist',
			},
		};

		return this.model.update(query, update);
	}
}

export default new Cases();
