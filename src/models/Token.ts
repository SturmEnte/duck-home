import { Schema, model } from "mongoose";

export default model(
	"token",
	new Schema({
		token: {
			type: String,
			required: true,
		},
	})
);
