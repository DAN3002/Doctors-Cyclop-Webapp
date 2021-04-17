import { Template } from 'meteor/templating';
import moment from 'moment';

import { hasRole } from './lib/hasRole';

Template.registerHelper('formatDate', function(date) {
	console.log(date);
	return moment(date).format('DD/MM/YYYY HH:mm:ss');
});


Template.registerHelper('hasRole', function(role) {
	return hasRole(role);
});
