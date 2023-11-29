import express, { Router } from 'express';
import { AuthorController } from './../controllers/author.controller.js';

const router = express.Router();

router.get('/', AuthorController.getAll)
router.get('/:authorId', AuthorController.getByAuthorId)
router.put('/:authorId', AuthorController.update);
router.delete('/:authorId', AuthorController.remove)

export default router;