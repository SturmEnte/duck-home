import { Router } from "express";

const router = Router();

// The sign up route has no front end because this app is not intended to be accessible by the public
router.post("/signup", (req, res) => {});

export default router;
