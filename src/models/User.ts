import { Schema, model } from "mongoose";

export default model(
	"user",
	new Schema({
		id: String,
		username: String,
		password: String,
		createdAt: Date,
	})
);
