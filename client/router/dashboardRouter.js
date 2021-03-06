import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
	name: 'dashboard',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'Patient Dashboard',
			content: 'patientList',
		});
	},
});

FlowRouter.route('/viewCase/:caseId', {
	name: 'viewcase',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'View Case',
			content: 'viewCase',
		});
	},
});

FlowRouter.route('/upload', {
	name: 'uploadFile',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'Upload File',
			content: 'uploadFile',
		});
	},
});

FlowRouter.route('/setting', {
	name: 'setting',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'Setting',
			content: 'setting',
		});
	},
});

FlowRouter.route('/summary', {
	name: 'summary',
	action() {
		BlazeLayout.render('dashboard', {
			title: 'Summary Dashboard',
			content: 'summary',
		});
	},
});
