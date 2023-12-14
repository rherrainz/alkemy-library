import express from "express";
import { authenticationController } from "../controllers/authentication.controller.js";
import {AuthenticationService} from "../services/authentication.service.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/", UserMiddleware.validateLogin, (req, res, next) => {
    authenticationController.login(req, res, next, AuthenticationService);
});

export default router;
