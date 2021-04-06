import { Settings } from '../../../model';

export const Setting = {
	getSetting(key) {
		return Settings.getByKey(key);
	},
};
