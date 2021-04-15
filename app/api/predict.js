import { WebApp } from 'meteor/webapp';
import express from 'express';
import parse from 'urlencoded-body-parser';

import { Storage } from '../aws-s3';
import { Cases } from '../model';

const router = express();

router.post('/api/uploadMaskImage', async (req, res) => {
	const body = await parse(req);


	const { caseId, base64 } = body;
	const caseData = Cases.findByCaseId(caseId).fetch()[0];

	const imageName = `${ caseData.fileName }_Mask.jpg`;
	const imageUrl = await Storage.uploadFileBase64(imageName, base64);

	Cases.updateMaskImageUrl(caseId, imageUrl);

	res.send(200);
});

WebApp.connectHandlers.use(router);
