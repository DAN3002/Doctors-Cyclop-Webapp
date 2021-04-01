import { Base } from '../_Base';

class Cases extends Base {
	constructor() {
		super('case');
	}

	add(patientId, doctorId, imageUrl) {
		const insert = {
			patientId,
			doctorId,
			imageUrl,
			submitTime: new Date(),
			state: 'Waiting',
		};

		return this.model.insert(insert);
	}

	findCaseByDoctorId(doctorId) {
		const query = {
			doctorId,
		};

		return this.model.find(query);
	}
}

export default new Cases();
