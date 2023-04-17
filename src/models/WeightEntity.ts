import { Schema, model } from "mongoose";

export default model(
	"weight_entity",
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
					type: Date,
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
