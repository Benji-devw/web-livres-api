const express = require('express'),
   router = express.Router(),
   booksController = require('../controllers/books.controllers'),
   auth = require('../middleware/auth.middleware'),
   multerConfig = require('../middleware/multer');
// const multer = require('multer');
// const upload = multer();  //upload.none(


// ROUTE Books
router.get('/bestrating', booksController.getBestRating);
router.get('/:id', booksController.getBook);
router.get('/', booksController.getBooks);

router.post('/', auth, multerConfig, booksController.addBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', auth, booksController.deleteBook);


module.exports = router;

