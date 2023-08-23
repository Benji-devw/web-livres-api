const express = require('express'),
   router = express.Router(),
   booksController = require('../controllers/books.controllers');


// ROUTE Books
router.get('/bestrating', booksController.getBestRating);
router.get('/:id', booksController.getBook);
router.get('/', booksController.getBooks);

router.post('/', booksController.addBook);


module.exports = router;

