import { Meteor } from 'meteor/meteor';

import { Settings } from '../../app/model';

Meteor.startup(function() {
	Settings.add('maxSpecialistSubmit', 'Max submit time', 1, 'number');
	Settings.add('maxSpecialistSkip', 'Max Skip time', 1, 'number');
	Settings.add('modelServerUrl', 'Model-Server url', '', 'text');
});
