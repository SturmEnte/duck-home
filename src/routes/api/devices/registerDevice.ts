import { Router } from "express";
import { randomUUID as uuid } from "crypto";

import { registerDevice } from "../../../deviceManager";

import Device from "../../../models/Device";

const router = Router();

router.post("/", async (req, res) => {
	const id = uuid();
	const url = req.body.url;
	const sensors = req.body.sensors;
	const userId = req.headers.authorization?.split(".")[1];

	if (!req.body.url) {
		res.status(400).json({
			error: "No url",
		});
	}

	if (!req.body.sensors) {
		res.status(400).json({
			error: "No devices",
		});
		return;
	}

	if (await Device.exists({ url, user_id: userId })) {
		res.status(400).json({
			error: "Device is already registered",
		});
		return;
	}

	Device.create({
		id,
		user_id: userId,
		type: "sensors",
		url,
		sensors,
		created: Date.now(),
	})
		.then(() => {
			res.sendStatus(201);
			registerDevice(id, url, sensors, String(userId));
		})
		.catch((err) => {
			res.status(500).json({ error: "Error while registering sensor" });
			console.log("Error while registering sensor: ", err);
		});
});

export default router;
