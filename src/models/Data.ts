import { Schema, model } from "mongoose";

export default model(
	"data",
	new Schema({
		deviceId: {
			required: true,
			type: String,
		},
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
