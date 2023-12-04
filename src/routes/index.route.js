import express from "express";
const router = express.Router();

import userRouter from "./user.route.js";
import authenticationRouter from "./authentication.route.js";
import authorRouter from "./author.route.js";
import bookRouter from "./book.route.js";
import loanRouter from "./loan.route.js";
import reviewRouter from "./review.route.js";
import genreRouter from "./genre.route.js";
import languageRouter from "./language.route.js";

router.use("/user", userRouter);
router.use("/login", authenticationRouter);
router.use("/author", authorRouter);
router.use("/book", bookRouter);
router.use("/loan", loanRouter);
router.use("/genre", genreRouter);
router.use("/language", languageRouter);
router.use("/review", reviewRouter);

export default router;
