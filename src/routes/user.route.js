import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { isAuthenticated, isAdmin, isSupAdmin } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get('/', isAuthenticated, UserController.getAll);
router.post('/', UserController.create);
router.get('/:id', UserController.getById);

export default router;
