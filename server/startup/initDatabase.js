import { Meteor } from 'meteor/meteor';

import { Cases } from '../../app/model';

Meteor.startup(function() {
	Cases.add('P1', 'dinhanh300229@gmail.com', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/P1_Base.jpg');
	Cases.add('P2', 'dinhanh300229@gmail.com', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B2_Base.jpg');
	Cases.add('P3', 'dinhanh300229@gmail.com', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B3_Base.jpg');
	Cases.add('P4', 'dinhanh300229@gmail.com', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B4_Base.jpg');
	Cases.add('P5', 'dinhanh300229@gmail.com', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B5_Base.jpg');
	Cases.add('P6', 'dinhanh300229@gmail.com', 'https://doctor-cylop.s3-ap-southeast-1.amazonaws.com/B6_Base.jpg');
});
