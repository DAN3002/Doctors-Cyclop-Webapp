import { Chart } from 'chart.js/dist/chart.min';

export class ChartBase {
	constructor(data, type, dom, options = {}) {
		const { onClickItem } = this;
		const config = {
			type,
			data,
			responsive: true,
			options: {
				...options,
				onClick(evt, item) {
					onClickItem(evt, item);
				},
			},
		};

		this.chart = new Chart(
			document.getElementById(dom),
			config,
		);
	}

	updateData(raw) {
		const data = this.processData(raw);
		this.chart.data.datasets[0].data = data;
		this.chart.update();
	}

	processData() {}

	onClickItem() {}
}
