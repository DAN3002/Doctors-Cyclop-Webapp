import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Swal from 'sweetalert2';

import './setting.html';

Template.setting.helpers({
	settings() {
		return Template.instance().settings.get();
	},
});

Template.setting.events({
	'click #btn-save'() {
		const settings = [];
		$('input').each((i, el) => {
			el = $(el);
			const value = el.val();
			settings.push({
				_id: el.attr('id'),
				value: el.attr('type') === 'text' ? value : parseInt(value),
			});
		});

		Meteor.call('setting:updateSettings', settings);

		Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Updated settings!',
		}).then(() => {
			window.location.reload();
		});
	},
});

Template.setting.onCreated(function() {
	this.settings = new ReactiveVar([]);

	Meteor.call('setting:getAllSetting', (err, res) => {
		this.settings.set(res);
	});
});
