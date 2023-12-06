import express from "express";
import { GenreController } from "../controllers/genre.controller.js";
import {
  isAdmin,
  isAuthenticated,
} from "../middlewares/authorization.middleware.js";
import { GenreMiddleware } from "../middlewares/genre.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, GenreController.getAll);
router.get("/:id", isAdmin, GenreController.getById);
router.post("/", isAdmin, GenreMiddleware.validateCreate, GenreController.add);

export default router;
