import { Router } from "express";

import ListEntry from "../../../../models/ListEntry";

const router = Router();

interface ListEntry {
	id: string;
	title: string;
	created: number;
}

router.get("/", async (req, res) => {
	if (!req.query.list_id) {
		res.status(400).json({
			error: "No list id",
		});
		return;
	}

	const userId: string = String(req.headers.authorization?.split(".")[1]);
	const listId: string = String(req.query.list_id);

	let listEntries: ListEntry[] = [];

	(await ListEntry.find({ user_id: userId, list_id: listId })).forEach((list) => {
		listEntries.push({
			id: list.id,
			title: list.title,
			created: list.created.getTime(),
		});
	});

	res.json(listEntries);
});

export default router;
