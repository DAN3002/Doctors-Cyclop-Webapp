import { Base } from '../_Base';

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
		};

		return this.model.find(query);
	}
}

export default new Cases();
