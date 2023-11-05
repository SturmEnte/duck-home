import { Schema, model } from "mongoose";

export default model(
	"list-entry",
	new Schema({
		user_id: {
			required: true,
			type: String,
		},
		list_id: {
			required: true,
			type: String,
		},
		id: {
			required: true,
			type: String,
		},
		title: {
			required: true,
			type: String,
		},
		created: {
			required: true,
			type: Date,
		},
	})
);
