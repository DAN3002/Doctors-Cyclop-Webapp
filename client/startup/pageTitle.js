/* global Deps */
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
	Deps.autorun(function() {
		document.title = 'Doctor Cyclop';
	});
});
