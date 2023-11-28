import express, { Router } from 'express';
import { BookController } from './../controllers/book.controller.js';

const router = express.Router();


router.get('/:id', BookController.getById)

export default router;