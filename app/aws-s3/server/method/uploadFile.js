import { Meteor } from 'meteor/meteor';

import { Storage } from '../Storage';

Meteor.methods({
	async 'aws-s3:uploadFile'(path, body) {
		const url = await Storage.uploadFile(path, body);
		return url;
	},
});
