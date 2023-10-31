import { Router } from "express";
import { randomUUID } from "crypto";

import List from "../../../models/List";

const router = Router();

router.post("/", async (req, res) => {
	if (!req.body.name) {
		res.status(400).json({
			error: "No name",
		});
		return;
	}

	const userId: string = String(req.headers.authorization?.split(".")[1]);
	let id: string = randomUUID();
	const name: string = req.body.name;

	if (await List.exists({ user_id: userId, name: name })) {
		res.status(400).json({
			error: "A list with that name already exists",
		});
		return;
	}

	while (await List.exists({ id: id })) {
		id = randomUUID();
	}

	const list = { user_id: userId, id: id, name: name, created: Date.now() };

	List.create(list)
		.then(() => {
			if (req.body.return == true) {
				res.status(201).json({
					id: list.id,
					name: list.name,
					created: list.created,
				});
				return;
			}

			res.sendStatus(201);
		})
		.catch((err) => {
			console.log("Error while creating list");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while creating list",
			});
		});
});

export default router;
