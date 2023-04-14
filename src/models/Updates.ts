import { Schema, model } from "mongoose";

export default model(
	"updates",
	new Schema({
		user_id: {
			type: String,
			required: true,
		},
		updates: {
			profile: Date,
			weight: Date,
		},
	})
);
