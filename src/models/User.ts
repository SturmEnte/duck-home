import { Schema, model } from "mongoose";

export default model(
	"user",
	new Schema({
		id: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
	})
);
