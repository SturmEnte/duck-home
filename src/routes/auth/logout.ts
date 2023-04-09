import { Router } from "express";

import Token from "../../models/Token";

const router = Router();

router.delete("/", async (req, res) => {
	if (!req.body.token) {
		res.status(400).json({
			error: "No token",
		});
		return;
	}

	if (!(await Token.exists({ token: req.body.token }))) {
		res.status(400).json({
			error: "Invalid token",
		});
		return;
	}

	await Token.deleteOne({ token: req.body.token });

	res.sendStatus(200);
});

export default router;
