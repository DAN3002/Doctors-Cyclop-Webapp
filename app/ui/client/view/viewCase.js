import { Template } from 'meteor/templating';
import Viewer from 'viewerjs';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { LABEL_LIST } from '../../../enum/LABEL_LIST';
import { loadFromCDN } from '../lib/loadFromCDN';
import { submitRelabel } from '../lib/submitRelabel';
import { Cases } from '../../../model';

import './viewCase.html';

Template.viewCase.helpers({
	labelList() {
		return LABEL_LIST;
	},
	caseData() {
		return Template.instance().caseData.get();
	},
});

Template.viewCase.events({
	'click #btn-submit'() {
		submitRelabel();
	},
});

const getImageList = () => {
	const caseData = Template.instance().caseData.get();
	const out = [
		{
			url: caseData.imageUrl,
			alt: 'Original Image',
		},
		{
			url: 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/P1_Mask.jpg',
			alt: 'Masked Image',
		},
	];
	return out.filter((el) => el.url);
};

const initViewer = (viewer) => {
	const imageList = getImageList();
	const container = $('#viewer-images');

	container.html('');
	for (const image of imageList) {
		container.append($(`<li><img src="${ image.url }" alt="${ image.alt }"></li>`));
	}

	viewer = new Viewer(document.getElementById('viewer-images'), {
		inline: true,
		navbar: true,
		title: true,
	});
	viewer.show();
};

Template.viewCase.onCreated(function() {
	let viewer;
	this.caseData = new ReactiveVar({});
	const caseId = FlowRouter.getParam('caseId');

	const caseSub = this.subscribe('caseByCaseId', caseId);

	this.autorun(() => {
		if (caseSub.ready()) {
			const data = Cases.findAllCase().fetch()[0];
			console.log(data);
			this.caseData.set(data);
			initViewer(viewer);
		}
	});
});

Template.viewCase.onRendered(function() {
	loadFromCDN('https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.9.0/viewer.min.css', 'css');
});
