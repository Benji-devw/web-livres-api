const express = require('express');
const router = express.Router();
const multer = require('multer'); // Importez le middleware multer
const booksController = require('../controllers/books.controllers');

// Configuration de multer pour stocker les images dans un dossier spécifique
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("FILE", file);
        cb(null, './uploads/'); // Spécifiez le dossier de destination
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname.toLowerCase().split(' ').join('-')); // Générez un nom de fichier unique
    }
});

const upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      // console.log('file........', file)
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
         cb(null, true);
      } else {
         cb(null, false);
         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
   }
});



module.exports = multer( upload ).single('image')