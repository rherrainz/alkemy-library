import express from 'express';
const router = express.Router();

// import userRouter from './user.route.js';
// import authorRouter from './author.route.js';
import bookRouter from './book.route.js';
// import loanRouter from './loan.route.js';
// import reviewRouter from './review.route.js';


router.use('/book', bookRouter);




export default router;