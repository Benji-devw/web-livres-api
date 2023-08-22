const express = require('express'),
   router = express.Router(),
   userController = require('../controllers/user.controllers'),
   auth = require('../middleware/auth.middleware');


// ROUTE Users
router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.get('/', userController.getUser);


module.exports = router;

