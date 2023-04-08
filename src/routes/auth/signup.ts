import { Router } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import User from "../../models/User";

const router = Router();

// The sign up route has no front end because this app is not intended to be accessible by the public
router.post("/", async (req, res) => {
	if (process.env.SIGN_UP_CODE && !req.body.sign_up_code) {
		res.status(401).json({
			error: "No sign up code",
		});
		return;
	}

	if (process.env.SIGN_UP_CODE && req.body.sign_up_code != process.env.SIGN_UP_CODE) {
		res.status(401).json({
			error: "Invalid sign up code",
		});
		return;
	}

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

	if (await User.exists({ username: { $regex: new RegExp(req.body.username, "i") } })) {
		res.status(400).json({
			error: "The username is already taken",
		});
		return;
	}

	// Prevent to users to have the same id
	let id = uuid();
	while (await User.exists({ id })) {
		id = uuid();
	}

	User.create({
		id,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10),
		createdAt: Date.now(),
	})
		.then(() => {
			res.status(201).json({ messsage: "Created user" });
		})
		.catch((err) => {
			console.log("Error while creating user");
			console.log(err);
			res.status(500).json({
				error: "Unknown error while creating user",
			});
		});
});

export default router;
