import { Schema, model } from "mongoose";

export default model(
	"weight-entity",
	new Schema({
		user_id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		unit: {
			type: String,
			required: true,
		},
		weight: [
			{
				weight: {
					type: Number,
					required: true,
				},
				date: {
					type: Number,
					required: true,
				},
			},
		],
		createdAt: {
			type: Date,
			required: true,
		},
	})
);
