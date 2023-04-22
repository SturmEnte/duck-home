import { Schema, model } from "mongoose";

export default model(
	"data",
	new Schema({
		sensorId: {
			required: true,
			type: String,
		},
		timestamp: {
			required: true,
			type: Date,
		},
		data: {
			required: true,
			type: Number,
		},
	})
);
