import express from 'express';
import BookController from '../controllers/BookController';

const router = express.Router();

router.get('/api/v1/books', BookController.getAllBooks);
router.post('/api/v1/books', BookController.addBook);
router.get('/api/v1/books/:id', BookController.getABook);
router.patch('/api/v1/books/:id', BookController.updatedBook);
router.delete('/api/v1/books/:id', BookController.deleteBook);

export default router;
