import { Schema, model } from "mongoose";

export default model(
	"list",
	new Schema({
		user_id: {
			required: true,
			type: String,
		},
		id: {
			required: true,
			type: String,
		},
		name: {
			required: true,
			type: String,
		},
		created: {
			required: true,
			type: Date,
		},
	})
);
