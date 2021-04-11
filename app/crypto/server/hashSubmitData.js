import sha1 from 'sha1';

import { Submits } from '../../model';

export const hashSubmitData = (submitId) => {
	const submitData = Submits.findById(submitId).fetch()[0];
	const hash = sha1(JSON.stringify(submitData));

	return Submits.updateHashById(submitId, hash);
};
