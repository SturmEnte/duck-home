import { Router } from "express";

import List from "../../../models/List";

const router = Router();

router.delete("/", async (req, res) => {
	if (!req.body.id) {
		res.status(400).json({
			error: "No id",
		});
		return;
	}

	const userId: string = String(req.headers.authorization?.split(".")[1]);
	const id: string = req.body.id;

	if (!(await List.exists({ user_id: userId, id: id }))) {
		res.status(400).json({
			error: "A list with that id does not exist",
		});
		return;
	}

	List.deleteOne({ user_id: userId, id: id })
		.then(() => {
			res.sendStatus(204);
		})
		.catch((err) => {
			console.log("Error while deleting list");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while deleting list",
			});
		});
});

export default router;
