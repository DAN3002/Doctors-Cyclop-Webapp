import { Meteor } from 'meteor/meteor';

export const hasRole = (role) => {
	const user = Meteor.user();
	return user && user.roles && user.roles.includes(role);
};
