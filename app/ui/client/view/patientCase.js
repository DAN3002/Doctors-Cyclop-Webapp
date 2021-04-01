import { Template } from 'meteor/templating';

import './patientCase.html';

Template.patientCase.helpers({
	status() {
		const {
			relabel, relabelResult,
		} = this;

		if (relabel) {
			return relabelResult ? 'Relabelled' : 'Relabelling';
		}
		return 'AI Predict';
	},
});
