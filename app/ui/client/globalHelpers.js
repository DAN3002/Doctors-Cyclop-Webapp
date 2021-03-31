import { Template } from 'meteor/templating';
import moment from 'moment';

Template.registerHelper('formatDate', function(date) {
	return moment(date).format('DD/MM/YYYY HH:mm:ss');
});
