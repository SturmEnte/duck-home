import { Router, json } from "express";

import signup from "./auth/signup";
import login from "./auth/login";
import user from "./user";

const router = Router();

router.use(json());

router.use("/signup", signup);
router.use("/login", login);

router.use("/user", user);

export default router;
