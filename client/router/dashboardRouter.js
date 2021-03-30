import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
	name: 'dashboard',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'Your Patient Dashboard',
			content: 'patientList',
		});
	},
});

FlowRouter.route('/viewCase', {
	name: 'viewcase',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'View Case',
			content: 'viewCase',
		});
	},
});
