import { Router, json } from "express";

import signup from "./api/auth/signup";
import login from "./api/auth/login";
import logout from "./api/auth/logout";
import user from "./api/user";
import updates from "./api/updates";

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
router.use("/updates", updates);

export default router;
