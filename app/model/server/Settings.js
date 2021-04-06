import { Base } from '../_Base';

class Settings extends Base {
	constructor() {
		super('settings');
	}

	updateSettingByKey(key, value) {
		const query = {
			_id: key,
		};
		const update = {
			$set: {
				value,
			},
		};

		return this.model.update(query, update);
	}

	getByKey(key) {
		const query = {
			_id: key,
		};

		return this.model.findOne(query);
	}

	getAllSettings() {
		const query = {};

		return this.model.find(query);
	}

	add(key, label, initValue, type) {
		const el = this.getByKey(key);

		if (!el) {
			const insert = {
				_id: key,
				label,
				value: initValue,
				type,
			};

			return this.model.insert(insert);
		}
	}
}

export default new Settings();
