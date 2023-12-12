import express from "express";
import { UserActivityController } from "../controllers/userActivity.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get('/loans/:id', isAdmin, UserActivityController.getLoansByUserId);
router.get('/events/:id', isAdmin, UserActivityController.getEventsByUserId);

export default router;
