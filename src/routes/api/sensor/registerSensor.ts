import { Router } from "express";
import { v4 as uuid } from "uuid";

import { registerSensor } from "../../../sensorManager";

import Sensor from "../../../models/Sensor";

const router = Router();

router.post("/", async (req, res) => {
	const id = uuid();
	const url = req.body.url;
	const sensors = req.body.sensors;
	const userId = req.headers.authorization?.split(".")[1];

	console.table({ url, sensors });

	if (!req.body.url) {
		res.status(400).json({
			error: "No url",
		});
	}

	if (!req.body.sensors) {
		res.status(400).json({
			error: "No sensors",
		});
		return;
	}

	if (await Sensor.exists({ url, user_id: userId })) {
		res.status(400).json({
			error: "Sensor is already registered",
		});
		return;
	}

	Sensor.create({
		id,
		user_id: userId,
		url,
		sensors,
		created: Date.now(),
	})
		.then(() => {
			res.sendStatus(201);
			registerSensor(id, url, sensors, String(userId));
		})
		.catch((err) => {
			res.status(500).json({ error: "Error while registering sensor" });
			console.log("Error while registering sensor: ", err);
		});
});

export default router;
