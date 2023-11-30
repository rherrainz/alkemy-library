import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);

export default router;
