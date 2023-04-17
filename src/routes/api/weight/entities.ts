import { Router } from "express";

import WeightEntity from "../../../models/WeightEntity";

interface Entity {
	name: string;
	unit: string;
	weight: { date: number; weight: number }[];
}

const router = Router();

router.get("/", async (req, res) => {
	let entities: Entity[] = [];
	(await WeightEntity.find({ user_id: req.headers.authorization?.split(".")[1] })).forEach((entity) => {
		entities.push({
			name: entity.name,
			unit: entity.unit,
			weight: entity.weight,
		});
	});
	res.json(entities);
});

export default router;
