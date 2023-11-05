import { Router } from "express";
import { randomUUID } from "crypto";

import ListEntry from "../../../../models/ListEntry";
import List from "../../../../models/List";

const router = Router();

router.post("/", async (req, res) => {
	if (!req.body.list_id) {
		res.status(400).json({
			error: "No list id",
		});
		return;
	}

	if (!req.body.title) {
		res.status(400).json({
			error: "No title",
		});
		return;
	}

	const userId: string = String(req.headers.authorization?.split(".")[1]);
	const listId: string = req.body.list_id;
	let id: string = randomUUID();
	const title: string = req.body.title;

	if (!(await List.exists({ user_id: userId, id: listId }))) {
		res.status(400).json({
			error: "List does not exist",
		});
		return;
	}

	while (await ListEntry.exists({ user_id: userId, list_id: listId, id: id })) {
		id = randomUUID();
	}

	ListEntry.create({
		user_id: userId,
		list_id: listId,
		id: id,
		title: title,
		created: Date.now(),
	})
		.then(() => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log("Error while creating list entry");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while creating list entry",
			});
		});
});

export default router;
