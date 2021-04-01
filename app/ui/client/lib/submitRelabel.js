// import Swal from 'sweetalert2';

export const submitRelabel = () => {
	// Get ticked value
	const selectedLabel = [];
	$('.form-check-input:checked').each((i, el) => {
		selectedLabel.push($(el).val());
	});
};
