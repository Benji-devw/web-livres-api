const express = require('express'),
   router = express.Router(),
   booksController = require('../controllers/books.controllers')
   auth = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer();


// ROUTE Books
router.get('/bestrating', booksController.getBestRating);
router.get('/:id', booksController.getBook);
router.get('/', booksController.getBooks);

router.post('/', auth, upload.none(), booksController.addBook);


module.exports = router;

