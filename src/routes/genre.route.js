import express from "express";
import { GenreController } from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/:id", GenreController.getById);

export default router;
