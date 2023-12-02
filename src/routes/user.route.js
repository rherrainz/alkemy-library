import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get('/', UserController.getAll);
router.post('/', UserController.create);
router.get('/:id', UserController.getById);

export default router;
