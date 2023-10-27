import { Router } from "express";

import List from "../../../models/List";

interface ListEntity {
	id: string;
	name: string;
	created: number;
}

const router = Router();

router.get("/", async (req, res) => {
	let lists: ListEntity[] = [];
	(await List.find({ user_id: req.headers.authorization?.split(".")[1] })).forEach((list) => {
		lists.push({
			id: list.id,
			name: list.name,
			created: list.created.getTime(),
		});
	});
	res.json(lists);
});

export default router;
