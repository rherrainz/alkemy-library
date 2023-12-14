import express from "express";
import { GenreController } from "../controllers/genre.controller.js";
import { GenreService } from "../services/genre.service.js";
import {
  isAdmin,
  isAuthenticated,
} from "../middlewares/authorization.middleware.js";
import { GenreMiddleware } from "../middlewares/genre.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, GenreController.getAll);
router.get("/:id", isAdmin, GenreController.getById);
router.post("/", isAdmin, GenreMiddleware.validateCreate, (req,res, next) => { GenreController.add(req, res, next, GenreService.create)});

export default router;
