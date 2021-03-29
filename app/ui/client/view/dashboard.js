import { Template } from 'meteor/templating';

import './dashboard.html';

Template.dashboard.onCreated(function() {
	console.log('Hello from console');
});
