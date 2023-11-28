import express from "express";
const router = express.Router();

import userRouter from "./user.route.js";

router.use("/user", userRouter);

export default router;
