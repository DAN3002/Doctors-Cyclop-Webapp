import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './setting.html';


Template.setting.helpers({
	settings() {
		return Template.instance().settings.get();
	},
});

Template.setting.onCreated(function() {
	this.settings = new ReactiveVar([]);

	Meteor.call('setting:getAllSetting', (err, res) => {
		this.settings.set(res);
	});
});
