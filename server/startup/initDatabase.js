import { Meteor } from 'meteor/meteor';

import { Cases } from '../../app/model';

Meteor.startup(function() {
	Cases.add('P1', 'dan', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/P1_Base.jpg');
	Cases.add('P2', 'dan', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B2_Base.jpg');
	Cases.add('P3', 'dan', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B3_Base.jpg');
	Cases.add('P4', 'dan', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B4_Base.jpg');
	Cases.add('P5', 'dan', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B5_Base.jpg');
	Cases.add('P6', 'dan', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B6_Base.jpg');
});
