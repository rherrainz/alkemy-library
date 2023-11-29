import express from "express";
import { LoanController } from "../controllers/loan.controller.js";

const router = express.Router();

router.get("/:id", LoanController.getById);

export default router;
