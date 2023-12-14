import express from "express";
import { LoanController } from "../controllers/loan.controller.js";
import { LoanService } from "../services/loan.service.js";
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
  (req, res, next) => {
  LoanController.create(req, res, next, LoanService.create)
});
router.patch(
  "/edit/:id",
  isAdmin,
  LoanMiddleware.validateUpdate,
  LoanController.edit
);

export default router;
