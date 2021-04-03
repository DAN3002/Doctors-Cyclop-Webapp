import { Template } from 'meteor/templating';

import { NAV_BAR } from '../../../../enum/NAV_BAR';
import './navBar.html';

Template.navBar.helpers({
	navItems() {
		return NAV_BAR;
	},
});

Template.navBar.events({
	'click .nav-link'(e) {
		const url = e.currentTarget.getAttribute('data-route');
		window.location.replace(url);
	},
});
