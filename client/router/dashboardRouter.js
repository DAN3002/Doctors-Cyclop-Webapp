import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
	name: 'dashboard',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'Dashboard',
			content: 'patientList',
		});
	},
});
