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
router.post("/", isAdmin, /*EventMiddleware.validateCreate,*/ EventController.create);
router.patch(
    "/edit/:id",
    isAdmin,
    /*EventMiddleware.validateUpdate,*/
    EventController.update
  );
  router.patch("/remove/:id", isAdmin, EventController.remove);


export default router;
