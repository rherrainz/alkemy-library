import express from "express";
import { GenreController } from "../controllers/genre.controller.js";

const router = express.Router();

router.get('/', GenreController.getAll);
router.get("/:id", GenreController.getById);
router.post('/', GenreController.add);

export default router;
