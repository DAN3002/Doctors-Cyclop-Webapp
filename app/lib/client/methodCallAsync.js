import { Meteor } from 'meteor/meteor';

export const methodCallAsync = (methodName, ...params) => new Promise((resolve, reject) => {
	Meteor.call(methodName, ...params, (err, res) => {
		if (err) {
			reject(err);
		} else {
			resolve(res);
		}
	});
});
