import { Router } from "express";

import Updates from "../../models/Updates";

const router = Router();

router.get("/", async (req, res) => {
	let updates = await Updates.findOne({ id: req.headers.authorization?.split(".")[1] });
	if (updates) {
		res.json(updates.updates);
		return;
	}
	res.json({});
});

export default router;
