const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  uploadImage
} = require('../controllers/bookController');

// Rutas de Google Books API
router.get('/search', searchBooks);

// Rutas CRUD básicas
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

// Subir imagen del libro
router.post('/upload-image', uploadImage);

module.exports = router;