import express from 'express';
import { BookController } from './../controllers/book.controller.js';

const router = express.Router();

router.get('/', BookController.getAll)
router.get('/:id', BookController.getById)
router.delete('/:id', BookController.remove)

export default router;