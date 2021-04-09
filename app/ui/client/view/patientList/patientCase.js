import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './patientCase.html';

// Template.patientCase.helpers({
// 	status() {
// 		const {
// 			relabel, relabelResult,
// 		} = this;

// 		if (relabel) {
// 			return relabelResult ? 'Relabelled' : 'Relabelling';
// 		}
// 		return 'AI Predict';
// 	},
// });

Template.patientCase.events({
	'click .case'() {
		const { _id: caseId } = Template.instance().data;
		const query = {};

		if (FlowRouter.current().queryParams.expert === 'true') {
			query.expert = true;
		}

		FlowRouter.go('viewcase', { caseId }, query);
	},
});
