import { Router } from "express";

import WeightEntity from "../../../models/WeightEntity";

interface Entity {
	name: string;
	unit: string;
	weight: WeightEntry[];
}

interface WeightEntry {
	weight: number;
	date: number;
}

const router = Router();

router.get("/", async (req, res) => {
	let entities: Entity[] = [];
	(await WeightEntity.find({ user_id: req.headers.authorization?.split(".")[1] })).forEach((entity) => {
		let weight: WeightEntry[] = [];

		entity.weight.forEach((w) => {
			weight.push({
				weight: w.weight,
				date: w.date,
			});
		});

		entities.push({
			name: entity.name,
			unit: entity.unit,
			weight: weight,
		});
	});
	res.json(entities);
});

export default router;
