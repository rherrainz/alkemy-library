import express from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { isAuthenticated } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/", ReviewController.getAll);
router.get("/:id", ReviewController.getById);
router.get("/user/:id", ReviewController.getByUserId);
router.get("/book/:id", ReviewController.getByBookId);
router.post("/", isAuthenticated, ReviewController.create);
router.patch("/:id", ReviewController.update);

export default router;
