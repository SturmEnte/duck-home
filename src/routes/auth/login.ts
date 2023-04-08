import { Router } from "express";
import { compareSync } from "bcrypt";
import { randomBytes } from "crypto";

import User from "../../models/User";
import Token from "../../models/Token";

const router = Router();

router.post("/", async (req, res) => {
	if (!req.body.username) {
		res.status(400).json({
			error: "No username",
		});
		return;
	}

	if (!req.body.password) {
		res.status(400).json({
			error: "No password",
		});
	}

	if (!(await User.exists({ username: { $regex: new RegExp(req.body.username, "i") } }))) {
		res.status(400).json({
			error: "No user with that username exists",
		});
		return;
	}

	const user = await User.findOne({ username: { $regex: new RegExp(req.body.username, "i") } });

	if (!compareSync(req.body.password, String(user?.password))) {
		res.status(400).json({
			error: "The password does not match",
		});
		return;
	}

	// The authentication token consits of the creation date, the user id and a string of random characters seperated by dots
	Token.create({
		token: `${Date.now()}.${user?.id}.${randomBytes(10).toString("hex")}`,
	})
		.then((token) => {
			res.json({
				token: token.token,
			});
		})
		.catch((err) => {
			console.log("Error while creating token");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while crating token",
			});
		});
});

export default router;
