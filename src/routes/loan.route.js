import express from "express";
import { LoanController } from "../controllers/loan.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";
import { LoanMiddleware } from "../middlewares/loan.middleware.js";

const router = express.Router();

router.get("/", isAdmin, LoanController.getAll);
router.get("/:id", isAdmin, LoanController.getById);
router.get("/dueDate/:dueDate", isAdmin, LoanController.getByDueDate);
router.post(
  "/",
  isAuthenticated,
  LoanMiddleware.validateCreate,
  LoanController.create
);
router.patch(
  "/edit/:id",
  isAdmin,
  LoanMiddleware.validateUpdate,
  LoanController.edit
);

router.get("/export-csv/all", isAdmin, LoanController.exportToCSV);
router.get("/export-csv/download/:filename", LoanController.downloadCSV);

export default router;
