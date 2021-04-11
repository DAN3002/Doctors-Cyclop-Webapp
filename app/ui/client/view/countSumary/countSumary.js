import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Cases } from '../../../../model';
import { getUserEmail } from '../../../../lib/client/getUserEmail';
import './countSumary.html';

Template.countSumary.helpers({
	countRelabelling()	 {
		return Template.instance().countRelabelling.get();
	},
});

Template.countSumary.onCreated(function() {
	this.countRelabelling = new ReactiveVar(0);

	const doctorEmail = getUserEmail();

	this.autorun(() => {
		this.countRelabelling.set(Cases.countRelabelling(doctorEmail));
	});
});
