import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { UserService } from "../services/user.service.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getAll);
router.get("/params", isAuthenticated, UserController.getByParams);
router.post("/", UserMiddleware.validateCreate, (req,res,next) => { UserController.create(req,res,next, UserService.create) });
router.get("/:id", isAdmin, UserController.getById);
router.delete("/:id", isSupAdmin, UserController.deleteById);
router.patch(
  "/:id",
  isAuthenticated,
  /*UserMiddleware.validateUpdate,*/
  UserController.update
);

export default router;
