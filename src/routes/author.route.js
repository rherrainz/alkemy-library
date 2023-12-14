import express, { Router } from "express";
import { AuthorController } from "./../controllers/author.controller.js";
import { AuthorService } from "../services/author.service.js";
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
  AuthorMiddleware.validateCreate, (req,res,next) => {
  AuthorController.create(req,res,next,AuthorService.create)});
router.put(
  "/:id",
  isAdmin,
  AuthorMiddleware.validateUpdate,
  AuthorController.update
);
router.delete("/:id", isAdmin, AuthorController.remove);

router.get("/export-csv/all", isAuthenticated, AuthorController.exportToCSV);
router.get("/export-csv/download/:filename", AuthorController.downloadCSV);

export default router;
