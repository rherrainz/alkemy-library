import express from 'express';
const router = express.Router();

import userRouter from './user.route.js';
import authenticationRouter from './authentication.route.js';
// import authorRouter from './author.route.js';
import bookRouter from './book.route.js';
// import loanRouter from './loan.route.js';
// import reviewRouter from './review.route.js';
import genreRouter from './genre.route.js';


router.use('/user', userRouter);
router.use('/login', authenticationRouter);
router.use('/book', bookRouter);
// router.use('/review', reviewRouter)
router.use('/genre', genreRouter)




export default router;