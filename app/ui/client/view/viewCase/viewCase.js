import { Template } from 'meteor/templating';
import Viewer from 'viewerjs';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import { LABEL_LIST } from '../../../../enum/LABEL_LIST';
import { loadFromCDN } from '../../lib/loadFromCDN';
import { submitRelabel } from '../../lib/submitRelabel';
import { skipRelabel } from '../../lib/skipRelabel';
import { Cases, Submits } from '../../../../model';
import { getUserEmail } from '../../../../lib/client/getUserEmail';

import './viewCase.html';

Template.viewCase.helpers({
	labelList() {
		return LABEL_LIST;
	},
	caseData() {
		return Template.instance().caseData.get();
	},
	canViewComment() {
		const caseData = Template.instance().caseData.get();

		if (caseData.doctorEmail === getUserEmail()) {
			return true;
		}

		return !caseData.relabel || FlowRouter.current().queryParams.expert === 'true';
	},
	canSubmitRelabel() {
		const caseData = Template.instance().caseData.get();

		if (caseData.doctorEmail === getUserEmail() && !Submits.isHasOwnerSubmit()) {
			return true;
		}

		return caseData.relabel && !caseData.relabelResult;
	},
	canRequestRelabel() {
		const caseData = Template.instance().caseData.get();
		return !caseData.relabel && !caseData.relabelResult && caseData.doctorEmail === getUserEmail();
	},
	hasAIPredict() {
		return Template.instance().caseData.get().AISubmitDate;
	},
	trueLabel() {
		return Template.instance().trueLabel.get();
	},
});

Template.viewCase.events({
	'click #btn-submit'() {
		submitRelabel();
	},
	'click #btn-skip'() {
		skipRelabel();
	},
	'click #btn-relabel'() {
		const caseId = FlowRouter.getParam('caseId');
		Meteor.call('predict:startRelable', caseId, () => {
			Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'Start relabel!',
			});
		});
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

const processAIResult = (result) => {
	const out = [];
	for (const [label, value] of Object.entries(result)) {
		if (value.label) {
			out.push({
				label,
				score: value.score,
			});
		}
	}

	return out;
};

Template.viewCase.onCreated(function() {
	let viewer;
	this.caseData = new ReactiveVar({});
	this.trueLabel = new ReactiveVar([]);
	const caseId = FlowRouter.getParam('caseId');

	const caseSub = this.subscribe('caseByCaseId', caseId);

	this.autorun(() => {
		if (caseSub.ready()) {
			const data = Cases.findAllCase().fetch()[0];
			this.caseData.set(data);
			this.trueLabel.set(processAIResult(data.AIResult || []));
			initViewer(viewer);
		}
	});
});

Template.viewCase.onRendered(function() {
	loadFromCDN('https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.9.0/viewer.min.css', 'css');
});
