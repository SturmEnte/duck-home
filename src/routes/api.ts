import { Router, json } from "express";

import signup from "./auth/signup";
import login from "./auth/login";
import logout from "./auth/logout";
import user from "./user";

import Token from "../models/Token";

const router = Router();

router.use(json());

// Authentication
router.use("/signup", signup);
router.use("/login", login);
router.use("/logout", logout);

// Check if user is authenticated
router.all("*", async (req, res, next) => {
	if (!req.headers.authorization) {
		res.sendStatus(401);
		return;
	}

	if (!(await Token.exists({ token: req.headers.authorization }))) {
		res.sendStatus(401);
		return;
	}

	next();
});

router.use("/user", user);

export default router;
