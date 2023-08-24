import { Router } from "express";

import Data from "../../../models/Data";

const router = Router();

router.get("/", async (req, res) => {
	const deviceId = req.body.deviceId;
	const sensorId = req.body.sensorId;
	const timeStart = req.body.time.start;
	const timeEnd = req.body.time.end;
	const userId = req.headers.authorization?.split(".")[1];

	if (!deviceId) {
		res.status(400).json({
			error: "No device id",
		});
		return;
	}

	if (!sensorId) {
		res.status(400).json({
			error: "No sensor id",
		});
		return;
	}

	if (!timeStart && timeStart != 0) {
		res.status(400).json({
			error: "No start time",
		});
		return;
	}

	if (!timeEnd) {
		res.status(400).json({
			error: "No end time",
		});
		return;
	}

	const data = await Data.find({
		deviceId,
		sensorId,
		timestamp: {
			$gte: timeStart,
			$lte: timeEnd,
		},
	});

	console.log(data);
	console.log(data.length);

	res.sendStatus(200);
});

export default router;
