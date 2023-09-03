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

	if (!req.body.unit) {
		res.status(400).json({
			error: "No unit",
		});
		return;
	}

	const userId: string = String(req.headers.authorization?.split(".")[1]);
	const name: string = req.body.name;
	const unit: string = req.body.unit;

	if (await WeightEntity.findOne({ user_id: userId, name })) {
		res.status(400).json({
			error: "Entity with that name already exists",
		});
		return;
	}

	WeightEntity.create({
		user_id: userId,
		name,
		unit,
		createdAt: Date.now(),
	})
		.then(() => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log("Error while creating entity");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while creating entity",
			});
		});
});

export default router;
