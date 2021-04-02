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
}

export default new Submits();
