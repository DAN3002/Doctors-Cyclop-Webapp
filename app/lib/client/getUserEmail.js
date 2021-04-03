import { Meteor } from 'meteor/meteor';

export const getUserEmail = () => {
	const user = Meteor.user();

	if (!user) {
		return;
	}

	const [{ address }] = user.emails;
	return address;
};
