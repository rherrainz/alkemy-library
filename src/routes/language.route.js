import express from "express";
import { LanguageController } from "../controllers/language.controller.js";

const router = express.Router();

router.get('/', LanguageController.getAll);
router.post('/', LanguageController.add);

export default router;
