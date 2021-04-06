import { Meteor } from 'meteor/meteor';

import { Settings } from '../../../model';

Meteor.methods({
	'setting:updateSettings'(settings) {
		for (const setting of settings) {
			Settings.updateSettingByKey(setting._id, setting.value);
		}
	},
});
