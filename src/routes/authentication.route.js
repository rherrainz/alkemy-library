import express from "express";
import { authenticationController } from "../controllers/authentication.controller.js";

const router = express.Router();

router.post("/", authenticationController.login);

export default router;
