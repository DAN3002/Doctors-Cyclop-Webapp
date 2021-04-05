import { Meteor } from 'meteor/meteor';

import { Storage } from '../Storage';

Meteor.methods({
	async 'aws-s3:getSignedURL'(fileName, fileType) {
		const request = await Storage.getSignedURL(fileName, fileType);
		return request;
	},
});
