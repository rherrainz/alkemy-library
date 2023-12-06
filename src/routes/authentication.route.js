import express from "express";
import { authenticationController } from "../controllers/authentication.controller.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/", UserMiddleware.validateLogin, authenticationController.login);

export default router;
