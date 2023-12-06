import express, { Router } from "express";
import { AuthorController } from "./../controllers/author.controller.js";
import {
  isAdmin,
  isAuthenticated,
} from "../middlewares/authorization.middleware.js";
import { AuthorMiddleware } from "../middlewares/author.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, AuthorController.getAll);
router.get("/:id", isAuthenticated, AuthorController.getByAuthorId);
router.post(
  "/",
  isAdmin,
  AuthorMiddleware.validateCreate,
  AuthorController.create
);
router.put(
  "/:id",
  isAdmin,
  AuthorMiddleware.validateUpdate,
  AuthorController.update
);
router.delete("/:id", isAdmin, AuthorController.remove);

export default router;
