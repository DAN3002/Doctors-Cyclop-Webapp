import { Template } from 'meteor/templating';
import Viewer from 'viewerjs';

import { loadFromCDN } from '../lib/loadFromCDN';
import { LABEL_LIST } from '../enum/LABEL_LIST';
import './viewCase.html';

Template.viewCase.helpers({
	labelList() {
		return LABEL_LIST;
	},
});

const initViewer = (viewer) => {
	// if (viewer) {
	// 	viewer.destroy();
	// }
	const img_placeholder = 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B2_Base.jpg';
	$('#viewer-images').html(`<li><img src="${ img_placeholder }" alt="Original Image"></li>`);
	viewer = new Viewer(document.getElementById('viewer-images'), {
		inline: true,
		navbar: true,
		title: true,
	});
	viewer.show();
};

Template.viewCase.onRendered(function() {
	loadFromCDN('https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.9.0/viewer.min.css', 'css');

	let viewer;
	initViewer(viewer);
});
