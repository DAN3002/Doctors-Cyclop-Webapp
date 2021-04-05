import { methodCallAsync } from '../../lib/client/methodCallAsync';

export const Storage = {
	async uploadFileToS3(file, fileName) {
		const storageReq = await methodCallAsync('aws-s3:getSignedURL', fileName, file.type);
		return new Promise((resolve) => {
			const formData = new FormData();
			formData.append('file', file);

			const xhr = new XMLHttpRequest();
			xhr.open('PUT', storageReq.signedRequest);
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(storageReq.url);
					}
				}
			};
			xhr.send(file);
			// $.ajax({
			// 	url: storageReq.signedRequest,
			// 	type: 'PUT',
			// 	data: formData,
			// 	processData: false,
			// 	contentType: false,
			// 	success: () => {
			// 		resolve(storageReq.url);
			// 	},
			// });
		});
	},
};
