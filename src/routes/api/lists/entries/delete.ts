import { Router } from "express";

import ListEntry from "../../../../models/ListEntry";

const router = Router();

router.delete("/", async (req, res) => {
	if (!req.body.list_id) {
		res.status(400).json({
			error: "No list id",
		});
		return;
	}

	if (!req.body.id) {
		res.status(400).json({
			error: "No id",
		});
		return;
	}

	const userId: string = String(req.headers.authorization?.split(".")[1]);
	const listId: string = req.body.list_id;
	const id: string = req.body.id;

	if (!(await ListEntry.exists({ user_id: userId, list_id: listId, id: id }))) {
		res.status(400).json({
			error: "No list entry with that id in that list exists",
		});
		return;
	}

	ListEntry.deleteOne({ user_id: userId, list_id: listId, id: id })
		.then(() => {
			res.sendStatus(204);
		})
		.catch((err) => {
			console.log("Error while deleting list entry");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while deleting list entry",
			});
		});
});

export default router;
