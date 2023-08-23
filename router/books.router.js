const express = require('express'),
   router = express.Router(),
   booksController = require('../controllers/books.controllers');


// ROUTE Books
router.get('/', booksController.getBooks);
// router.post('/login', userController.login);
// router.get('/', userController.getUser);


module.exports = router;

