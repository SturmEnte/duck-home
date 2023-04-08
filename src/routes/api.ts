import { Router, json } from "express";

import signup from "./auth/signup";

const router = Router();

router.use(json());

router.use("/signup", signup);

export default router;
