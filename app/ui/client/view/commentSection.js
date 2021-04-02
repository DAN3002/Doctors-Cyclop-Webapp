import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Submits } from '../../../model';
import './commentSection.html';

Template.commentSection.helpers({
	submitList() {
		return Template.instance().submitList.get();
	},
	getSelectedLabel(labelList) {
		const out = [];
		for (const label in labelList) {
			if (labelList[label]) {
				out.push(label);
			}
		}

		return out;
	},
});


Template.commentSection.onCreated(function() {
	this.submitList = new ReactiveVar([]);
	const caseId = FlowRouter.getParam('caseId');
	const submitSub = this.subscribe('submitByCaseId', caseId);

	this.autorun(() => {
		if (submitSub.ready()) {
			const submitList = Submits.findAllSubmit().fetch();

			this.submitList.set(submitList);
		}
	});
});
