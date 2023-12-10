import express from "express";
import { BookController } from "./../controllers/book.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";
import { BookMiddleware } from "../middlewares/book.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, BookController.getAllActive);
router.get("/all", isAdmin, BookController.getAll);
router.get("/params", isAuthenticated, BookController.getByParams);
router.get("/loan", isAdmin, BookController.getOnlyLoan);
router.get("/:id", isAuthenticated, BookController.getById);
router.get("/author/:id", isAuthenticated, BookController.getByAuthorId);
router.get("/genre/:id", isAuthenticated, BookController.getByGenreId);
router.get("/author-title", isAuthenticated, BookController.getByAuthorOrTitle);
router.delete("/:id", isAdmin, BookController.remove);
router.post("/", isAdmin, BookMiddleware.validateCreate, BookController.create);
router.patch(
  "/:id",
  isAdmin,
  BookMiddleware.validateUpdate,
  BookController.update
);
router.patch("/return/:id", isAdmin, (req, res, next) =>
  BookController.returnBook(req, res, next, req.app.get("io"))
);

export default router;
