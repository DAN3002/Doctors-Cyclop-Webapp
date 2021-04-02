import { Base } from '../_Base';

class Submits extends Base {
	constructor() {
		super('submit');
	}

	findAllSubmit() {
		const query = {};
		return this.model.find(query);
	}
}

export default new Submits();
