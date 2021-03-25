import { Template } from 'meteor/templating';

import './home.html';

Template.home.onCreated(function() {
	console.log('Hello from console');
});
