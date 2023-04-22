import { Router } from "express";

import Data from "../../../models/Data";

const router = Router();

router.post("/", (req, res) => {
	const sensorId = String(req.body.sensorId);
	const timestamp = Number(req.body.timestamp);
	const data = Number(req.body.data);

	console.table({ sensorId, timestamp, data });

	if (!req.body.sensorId) {
		res.status(400).json({
			error: "No sensor id",
		});
		return;
	}

	if ((!req.body.timestamp && data != 0) || !Number.isInteger(req.body.timestamp)) {
		res.status(400).json({
			error: "No timestamp",
		});
		return;
	}

	if ((!req.body.data && data != 0) || !Number.isInteger(req.body.data)) {
		res.status(400).json({
			error: "No data",
		});
		return;
	}

	Data.create({
		sensorId,
		timestamp,
		data,
	})
		.then(() => res.sendStatus(200))
		.catch((err) => {
			res.status(500).json({
				error: "Error while saving data",
			});
			console.log("Error while saving data:", err);
		});
});

export default router;
