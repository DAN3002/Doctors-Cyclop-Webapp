/* eslint-disable no-await-in-loop */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import { Storage } from '../../../../file';
import { getUserEmail } from '../../../../lib/client/getUserEmail';
import './uploadFile.html';

Template.uploadFile.events({
	async 'click #btn-upload'() {
		Swal.fire({
			title: 'Please Wait !',
			html: 'data uploading',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			},
		});
		const selectedFileList = $('#upload-file')[0].files;
		const doctorEmail = getUserEmail();

		const fileList = [];
		for (const file of selectedFileList) {
			// const fileBuffer = await File.convertFileToStream(file);
			const [patientId, extension] = file.name.split('.');
			const fileName = `${ patientId }-${ new Date().getTime() }.${ extension }`;
			const fileUrl = await Storage.uploadFileToS3(file, fileName);

			fileList.push({
				fileUrl, patientId,
			});
		}

		Swal.close();
		$('#upload-file').val('');
		Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Submitted your image!',
		});

		Meteor.call('predict:createNewCase', fileList, doctorEmail);
	},
});
