import { Router, json } from "express";

import signup from "./auth/signup";
import login from "./auth/login";
import User from "../models/User";

const router = Router();

router.get("/", async (req, res) => {
	let user = await User.findOne({ id: req.headers.authorization?.split(".")[1] });
	res.json({
		username: user?.username,
		createdAt: user?.createdAt,
	});
});

export default router;
