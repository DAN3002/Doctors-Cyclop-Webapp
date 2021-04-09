import { Base } from '../_Base';
import { getStateFromLableList } from '../../lib/server/getStateFromLableList';
import { LABEL_LIST } from '../../enum/LABEL_LIST';

class Cases extends Base {
	constructor() {
		super('case');
	}

	add(patientId, doctorEmail, imageUrl, fileName) {
		const insert = {
			patientId,
			doctorEmail,
			imageUrl,
			fileName,
			submitTime: new Date(),
			state: 'Waiting',
			status: 'AI Predict',
		};

		return this.model.insert(insert);
	}

	updateAIResult(result) {
		const { caseID: _id } = result;
		const lablesList = {};
		for (const label of LABEL_LIST) {
			lablesList[label] = result[label].label;
		}
		const state = getStateFromLableList(lablesList);
		delete result.caseId;

		const query = {
			_id,
		};
		const update = {
			$set: {
				state,
				AIResult: result,
				AISubmitDate: new Date(),
			},
		};

		return this.model.update(query, update);
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

	findCaseNeedRelabel() {
		const query = {
			relabel: true,
			relabelResult: {
				$exists: false,
			},
		};

		return this.model.find(query);
	}

	updateRelabelResult(caseId, result) {
		const query = {
			_id: caseId,
		};
		const update = {
			$set: {
				relabelResult: result,
				state: getStateFromLableList(result),
				status: 'Relabelled',
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

	startRelabel(caseId) {
		const query = {
			_id: caseId,
		};
		const update = {
			$set: {
				relabel: true,
				relabelRole: 'specialist',
				status: 'Relabelling',
			},
		};

		return this.model.update(query, update);
	}

	findAll() {
		return this.model.find({});
	}
}

export default new Cases();
