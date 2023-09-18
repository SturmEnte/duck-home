import { Router } from "express";

import List from "../../../models/List";

interface ListEntity {
	id: string;
	name: string;
}

const router = Router();

router.get("/", async (req, res) => {
	let lists: ListEntity[] = [];
	(await List.find({ user_id: req.headers.authorization?.split(".")[1] })).forEach((list) => {
		lists.push({
			id: list.id,
			name: list.name,
		});
	});
	res.json(lists);
});

export default router;
