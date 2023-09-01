const express = require('express'),
   router = express.Router(),
   booksController = require('../controllers/books.controllers'),
   auth = require('../middleware/auth.middleware'),
   { uploadMulter } = require('../middleware/multer.middleware'),
   { uploadSharp } = require('../middleware/sharp.middleware');
// const multer = require('multer');
// const upload = multer();  //upload.none(


// ROUTE Books
router.get('/bestrating', booksController.getBestRating);
router.get('/:id', booksController.getBook);
router.get('/', booksController.getBooks);

router.post('/', auth, uploadMulter, uploadSharp, booksController.addBook);
// add router for post rating
router.post('/:id/rating', auth, booksController.addRating);
router.put('/:id', auth, uploadMulter, uploadSharp, booksController.updateBook);
router.delete('/:id', auth, booksController.deleteBook);


module.exports = router;

