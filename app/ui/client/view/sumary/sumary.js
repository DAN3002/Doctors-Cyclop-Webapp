import {
	Template,
} from 'meteor/templating';

import { Chart } from '../../../../../node_modules/chart.js/dist/chart.min';
import './sumary.html';

Template.sumary.onRendered(function() {
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
	];
	const data = {
		labels,
		datasets: [{
			label: 'My First dataset',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0, 10, 5, 2, 20, 30, 45],
		}],
	};
	const config = {
		responsive: true,
		type: 'line',
		data,
		options: {},
	};
	new Chart(
		document.getElementById('myChart'),
		config,
	);
});
