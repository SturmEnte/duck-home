import { Router } from "express";

import WeightEntity from "../../../models/WeightEntity";

const router = Router();

router.post("/", async (req, res) => {
	if (!req.body.name) {
		res.status(400).json({
			error: "No name",
		});
		return;
	}

	if (!req.body.weight) {
		res.status(400).json({
			error: "No weight",
		});
		return;
	}

	if (!req.body.date) {
		res.status(400).json({
			error: "No date",
		});
		return;
	}

	const name: string = req.body.name;
	const weight: number = req.body.weight;
	const date: number = req.body.date;

	if (!(await WeightEntity.exists({ user_id: req.headers.authorization?.split(".")[1], name }))) {
		res.status(400).json({
			error: "Entity with that name does not exist",
		});
		return;
	}

	let entity = await WeightEntity.findOne({ user_id: req.headers.authorization?.split(".")[1], name });

	let found = false;

	entity?.weight.forEach((eWeight) => {
		if (eWeight.date == date) {
			eWeight.weight = weight;
			found = true;
		}
	});

	if (!found) {
		entity?.weight.push({
			weight,
			date,
		});
	}

	await entity?.save();

	res.sendStatus(200);
});

export default router;
