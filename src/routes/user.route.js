import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.get("/:id", userController.getOneUser);

export default router;
