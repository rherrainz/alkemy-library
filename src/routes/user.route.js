import express from "express";
import { UserController } from "../controllers/user.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getAll);
router.get("/params", isAuthenticated, UserController.getByParams);
router.post("/", UserMiddleware.validateCreate, UserController.create);
router.get("/:id", isAdmin, UserController.getById);
router.delete("/:id", isSupAdmin, UserController.deleteById);

export default router;
