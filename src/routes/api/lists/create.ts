import { Router } from "express";

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
	const name: string = req.body.name;

	if (await List.exists({ user_id: userId, name: name })) {
		res.status(400).json({
			error: "A list with that name already exists",
		});
		return;
	}

	List.create({ user_id: userId, name: name })
		.then(() => {
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
