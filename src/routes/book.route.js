import express from "express";
import { BookController } from "./../controllers/book.controller.js";
import { BookService } from "../services/book.service.js";
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
router.get("/author-title", isAuthenticated, BookController.getByAuthorOrTitle);
router.delete("/:id", isAdmin, BookController.remove);
router.post("/", isAdmin, BookMiddleware.validateCreate, (req, res, next) => { BookController.create(req,res,next, BookService.create)});
router.patch(
  "/:id",
  isAdmin,
  BookMiddleware.validateUpdate,
  BookController.update
);
router.patch("/return/:id", isAdmin, (req, res, next) =>
  BookController.returnBook(req, res, next, req.app.get("io"))
);
router.get(
  "/recommendations/last-genre",
  isAuthenticated,
  BookController.getByLastGenre
);
router.get(
  "/recommendations/last-author",
  isAuthenticated,
  BookController.getByLastAuthor
);

router.get("/export-csv/all", isAuthenticated, BookController.exportToCSV);
router.get("/export-csv/download/:filename", BookController.downloadCSV);

export default router;
