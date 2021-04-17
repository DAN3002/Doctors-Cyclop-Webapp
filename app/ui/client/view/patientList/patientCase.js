import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './patientCase.html';

Template.patientCase.helpers({
	score() {
		const {
			state, AIResult, status,
		} = this;

		if (!AIResult || status === 'Relabelled' || state === 'Unknown') {
			return '';
		}

		const score = Math.max(
			...Object.keys(AIResult)
				.filter((key) => key.includes(state))
				.map((key) => AIResult[key].score),
		);

		return score ? score.toFixed(4) : '';
	},
});

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
