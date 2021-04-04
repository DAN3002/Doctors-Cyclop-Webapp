import S3 from './startup/S3';

const BUCKET_NAME = 'doctor-cylop';
export const Storage = {
	uploadFile(Key, Body) {
		const params = {
			Bucket: BUCKET_NAME,
			Key,
			Body,
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
};
