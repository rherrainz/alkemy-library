import express from "express";
import { BookController } from "./../controllers/book.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/", BookController.getAll);
router.get("/:id", BookController.getById);
router.get("/author/:id", BookController.getByAuthorId);
router.get("/genre/:id", BookController.getByGenreId);
router.get(
  "/author-title/:id",
  isAuthenticated,
  BookController.getByAuthorOrTitle,
);
router.delete("/:id", BookController.remove);
router.post("/", BookController.create);
router.patch("/:id", BookController.update);

export default router;
