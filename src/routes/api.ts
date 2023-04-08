import { Router } from "express";

const router = Router();

router.all("*", (req, res) => res.send("Api"));

export default router;
