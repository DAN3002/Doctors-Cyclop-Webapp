import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import { getUserEmail } from '../../../lib/client/getUserEmail';

export const skipRelabel = () => {
	const caseId = FlowRouter.getParam('caseId');
	/* TODO get doctordata */
	const doctorEmail = getUserEmail();
	const type = FlowRouter.current().queryParams.expert === 'true' ? 'Expert' : 'Specialist';

	Swal.fire({
		title: 'Are you sure?',
		icon: 'warning',
		confirmButtonText: 'Yes',
		showCancelButton: true,
		dangerMode: true,
	}).then((value) => {
		if (value.isConfirmed) {
			const param = { caseId, doctorEmail, type };
			Meteor.call('predict:skipRelabel', param, () => {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Skipped!',
				});
			});
		}
	});
};
