import S3 from './startup/S3';

const BUCKET_NAME = 'doctor-cylop';
export const Storage = {
	uploadFileBase64(Key, base64) {
		const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
		const params = {
			Bucket: BUCKET_NAME,
			Key,
			Body: base64Data,
			ContentType: 'image/jpg',
		};
		return new Promise((resolve, reject) => {
			S3.upload(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.Location);
				}
			});
		});
	},

	getSignedURL(fileName, fileType) {
		const params = {
			Bucket: BUCKET_NAME,
			Key: fileName,
			Expires: 60,
			ContentType: fileType,
			ACL: 'public-read',
		};

		return new Promise((resolve, reject) => {
			S3.getSignedUrl('putObject', params, (err, data) => {
				if (err) {
					reject(err);
				}
				const returnData = {
					signedRequest: data,
					url: `https://${ BUCKET_NAME }.s3.amazonaws.com/${ fileName }`,
				};

				resolve(returnData);
			});
		});
	},
};
