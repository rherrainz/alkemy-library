import express from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { isAuthenticated } from "../middlewares/authorization.middleware.js";
import { ReviewMiddleware } from "../middlewares/review.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, ReviewController.getAll);
router.get("/:id", isAuthenticated, ReviewController.getById);
router.get("/user/:id", isAuthenticated, ReviewController.getByUserId);
router.get("/book/:id", isAuthenticated, ReviewController.getByBookId);
router.post(
  "/",
  isAuthenticated,
  ReviewMiddleware.validateCreate,
  ReviewController.create
);
router.patch(
  "/:id",
  isAuthenticated,
  ReviewMiddleware.validateUpdate,
  ReviewController.update
);

export default router;
