import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
	user.roles = ['specialist'];
	return user;
});
