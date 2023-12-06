import express from "express";
import { LanguageController } from "../controllers/language.controller.js";
import {
  isAdmin,
  isAuthenticated,
} from "../middlewares/authorization.middleware.js";
import { LanguageMiddleware } from "../middlewares/language.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, LanguageController.getAll);
router.post(
  "/",
  isAdmin,
  LanguageMiddleware.validateCreate,
  LanguageController.add
);

export default router;
