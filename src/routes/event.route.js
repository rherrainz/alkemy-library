import express from "express";
import { EventController } from "./../controllers/event.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";
//import { EventMiddleware } from "../middlewares/event.middleware.js";

const router = express.Router();

router.get("/all", isAuthenticated, EventController.getAll);


export default router;
