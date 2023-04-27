import { Router, json } from "express";

import signup from "./api/auth/signup";
import login from "./api/auth/login";
import logout from "./api/auth/logout";

import user from "./api/user";
import updates from "./api/updates";

import createEntity from "./api/weight/createEntity";
import entities from "./api/weight/entities";
import setEntry from "./api/weight/setEntry";

import registerDevice from "./api/devices/registerDevice";

import add from "./api/data/addData";

import Token from "../models/Token";

const router = Router();

router.use(json());

// Authentication
router.use("/auth/signup", signup);
router.use("/auth/login", login);
router.use("/auth/logout", logout);

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

// Weight
router.use("/weight/createEntity", createEntity);
router.use("/weight/entities", entities);
router.use("/weight/setEntry", setEntry);

// Data
// router.use("/data/add", add);

// Deices
router.use("/device/register", registerDevice);

export default router;
