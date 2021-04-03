import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import { getUserEmail } from '../../../lib/client/getUserEmail';

export const submitRelabel = () => {
	// Get ticked value
	const selectedLabels = [];
	$('.form-check-input:checked').each((i, el) => {
		$(el).prop('checked', false);
		selectedLabels.push($(el).val());
	});

	const caseId = FlowRouter.getParam('caseId');
	/* TODO get doctordata */
	const doctorEmail = getUserEmail();
	const type = 'Specialist';

	Swal.fire({
		title: 'Comment',
		input: 'text',
		html:
		'<div style="margin-left:1px;margin-right:1px;font-size:18px;" align="left"> '
		+ '	<div style="margin-left:10px;margin-right:10px;"> '
		+ '		<textarea id="mentorComment" placeholder="Type your comment" class="swal2-textarea"></textarea>'
		+ '	</div>'
		+ '</div>',
		onBeforeOpen: () => {
			Swal.getInput().style.display = 'none';
		},
		// customClass: 'swal-wide',
		showConfirmButton: true,
		showCancelButton: true,
		width: '850px',
		allowOutsideClick: false,
		preConfirm: () => document.getElementById('mentorComment').value,
	}).then((result) => {
		if (result.isConfirmed) {
			const comment = result.value;
			const param = { caseId, doctorEmail, type, selectedLabels, comment };
			Meteor.call('predict:submitRelabel', param, () => {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Submitted your predict!',
				});
			});
		}
	});
	// const caseId = FlowRouter.getParam('caseId');
};
