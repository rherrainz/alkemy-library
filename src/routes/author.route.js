import express, { Router } from "express";
import { AuthorController } from "./../controllers/author.controller.js";

const router = express.Router();

router.get("/", AuthorController.getAll);
router.get("/:id", AuthorController.getByAuthorId);
router.post("/", AuthorController.create);
router.put("/:id", AuthorController.update);
router.delete("/:id", AuthorController.remove);

export default router;
