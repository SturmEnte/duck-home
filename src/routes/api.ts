import { Router, json } from "express";

import signup from "./auth/signup";
import login from "./auth/login";

const router = Router();

router.use(json());

router.use("/signup", signup);
router.use("/login", login);

export default router;
