import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Cases } from '../../../../model';
import { getUserEmail } from '../../../../lib/client/getUserEmail';
import { STATE } from '../../../../enum/STATE';
import { STATUS } from '../../../../enum/STATUS';
import './patientList.html';

Template.patientList.helpers({
	casesList() {
		return Template.instance().casesList.get();
	},
	states() {
		return STATE;
	},
	statuss() {
		return STATUS;
	},
	isSelectedState(currentState) {
		const { state } = FlowRouter.current().queryParams;
		return state === currentState;
	},
	isSelectedStatus(currentStatus) {
		const { status } = FlowRouter.current().queryParams;
		return status === currentStatus;
	},
	filterQuery() {
		return FlowRouter.current().queryParams;
	},
});

Template.patientList.events({
	'click #findBtn'() {
		const patientId = $('#patientIdInput').val();
		const state = $('#patientState').val();
		const status = $('#patientStatus').val();

		const filter = {};

		if (patientId && patientId.length) {
			filter.patientId = patientId;
		}

		if (state !== 'All') {
			filter.state = state;
		}

		if (status !== 'All') {
			filter.status = status;
		}

		if (FlowRouter.current().queryParams.expert === 'true') {
			filter.expert = true;
		}

		Template.instance().filter.set(filter);
	},
});

Template.patientList.onCreated(function() {
	const query = FlowRouter.current().queryParams;
	query.expert = query.expert === 'true';

	this.casesList = new ReactiveVar([]);
	this.filter = new ReactiveVar(query);

	let caseSub;
	if (query.all === 'true') {
		caseSub = this.subscribe('allCase');
	} else {
		caseSub = query.relabel === 'true' ? this.subscribe('needRelabelCase')
			: this.subscribe('caseByDoctorEmail', getUserEmail());
	}

	this.autorun(() => {
		if (caseSub.ready()) {
			const data = Cases.findByFilter(this.filter.get()).fetch();
			this.casesList.set(data);
		}
	});
});
