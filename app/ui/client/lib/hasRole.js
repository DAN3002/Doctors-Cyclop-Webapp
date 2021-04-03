import { Meteor } from 'meteor/meteor';

export const hasRole = (role) => {
	const user = Meteor.user();
	return user.roles.includes(role);
};
