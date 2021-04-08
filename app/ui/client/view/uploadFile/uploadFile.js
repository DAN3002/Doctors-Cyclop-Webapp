/* eslint-disable no-await-in-loop */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import { Storage } from '../../../../file';
import { getUserEmail } from '../../../../lib/client/getUserEmail';
import './uploadFile.html';

const splitFileName = (fileName) => {
	const i = fileName.lastIndexOf('.');
	return [fileName.substring(0, i), fileName.substring(i)];
};

Template.uploadFile.events({
	async 'click #btn-upload'() {
		Swal.fire({
			title: 'Please Wait !',
			html: 'data uploading',
			allowOutsideClick: false,
			showConfirmButton: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			},
		});
		const selectedFileList = $('#upload-file')[0].files;
		const doctorEmail = getUserEmail();

		const fileList = [];
		for (const file of selectedFileList) {
			// const fileBuffer = await File.convertFileToStream(file);
			const [patientId, extension] = splitFileName(file.name);
			const fileName = `${ patientId }-${ new Date().getTime() }`;
			const fileUrl = await Storage.uploadFileToS3(file, `${ fileName }${ extension }`);

			fileList.push({
				url: fileUrl,
				patientId,
				fileName,
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
