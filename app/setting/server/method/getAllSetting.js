import { Meteor } from 'meteor/meteor';

import { Settings } from '../../../model';

Meteor.methods({
	'setting:getAllSetting'() {
		return Settings.getAllSettings().fetch();
	},
});
