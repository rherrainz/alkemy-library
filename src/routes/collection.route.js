import express from "express";
import { CollectionController } from "./../controllers/collection.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isSupAdmin,
} from "../middlewares/authorization.middleware.js";
//import { EventMiddleware } from "../middlewares/event.middleware.js";

const router = express.Router();

router.get("/all", isAuthenticated, CollectionController.getAll);
router.post(
  "/",
  isAuthenticated,
  //isAdmin,
  /*CollectionMiddleware.validateCreate,*/ CollectionController.create
);
router.patch(
  "/edit/:id",
  //isAdmin,
  /*CollectionMiddleware.validateUpdate,*/
  CollectionController.update
);
router.patch("/remove/:id", /*isAdmin,*/ CollectionController.remove);

router.get("/export-csv/all", isAuthenticated, CollectionController.exportToCSV);
router.get("/export-csv/download/:filename", CollectionController.downloadCSV);

export default router;
