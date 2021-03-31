import { Mongo } from 'meteor/mongo';

export class Base {
	constructor(collectionName) {
		this.model = new Mongo.Collection(collectionName);
	}
}
