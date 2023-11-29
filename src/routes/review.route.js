import express from "express";
import { GenreController } from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/:id", GenreControllerController.getById);

export default router;
