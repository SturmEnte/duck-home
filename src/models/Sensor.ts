import { Schema, model } from "mongoose";

export default model(
	"sensor",
	new Schema({
		id: {
			required: true,
			type: String,
		},
		user_id: {
			required: true,
			type: String,
		},
		url: {
			required: true,
			type: String,
		},
		sensors: [
			{
				id: String,
				name: String,
				unit: String,
			},
		],
		created: {
			required: true,
			type: Date,
		},
	})
);
