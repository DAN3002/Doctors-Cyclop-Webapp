import { Template } from 'meteor/templating';

import './dashboard.html';

Template.dashboard.onCreated(function() {
	this.subscribe('userData');
});
