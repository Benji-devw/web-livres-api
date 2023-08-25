const fs = require('fs');
const path = require('path');
const Books = require('../models/books.model');
const sharp = require('sharp');

exports.getBooks = (req, res) => {
    console.log('GET_BOOKS');
    Books.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
}


exports.getBook = (req, res) => {
    console.log('GET_BOOK_BY_ID');
    Books.findOne({_id: req.params.id})
   .then(data => res.status(200).json(data))
   .catch(err => res.status(500).json({error: err}))
}


exports.getBestRating = (req, res) => {
    console.log('GET_BEST_RATING');
    Books.aggregate([
        {
            $unwind: "$ratings" // Décompose le tableau de notes en documents individuels
        },
        {
            $group: {
                _id: "$_id",
                averageRating: { $avg: "$ratings.grade" }, // Calcule la moyenne des notes
                title: { $first: "$title" },
                author: { $first: "$author" },
                imageUrl: { $first: "$imageUrl" }
            }
        },
        {
            $sort: {
                averageRating: -1 // Trie par note moyenne décroissante
            }
        },
        {
            $limit: 3
        }
    ])
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({error: err}))
}


exports.addBook = async (req, res) => {
    console.log('ADD_BOOK');
    // console.log(req.headers.authorization);
    // console.log(req.file);
    
    try {
        const bookData = JSON.parse(req.body.book);
        let imageUrl = ''       
        if (req.file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const name = `${uniqueSuffix}-${req.file.originalname.toLowerCase().split(' ').join('-')}`
            const path = `./uploads/`
            await sharp(req.file.buffer)
                .resize(206, 260)
                .toFile(`${ path }/${ name }`);
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${name}`
        } else {
            imageUrl = "https://via.placeholder.com/206x260";
        }

        const book = new Books({...bookData, imageUrl});
        const savedBook = await book.save(); // Enregistrez le livre
        
        res.status(200).json(savedBook); // Renvoyez les données enregistrées
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Add fail !' });
    }
}


exports.deleteBook = async (req, res) => {
    console.log('DELETE_BOOK');
    
    try {
        const book = await Books.findOne({ _id: req.params.id });
        // console.log(book);
        // Delete the associated image if it exists
        if (book.imageUrl !== 'https://via.placeholder.com/206x260') {
            // TODO: find better way to delete the image
            let decoup = book.imageUrl.split('/')
            const imageName = decoup[decoup.length - 1];
            const imagePath = `./uploads/${imageName}`
            fs.unlinkSync(imagePath);
        }
        book.deleteOne();
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete fail !' });
    }
}



// TODO: add PUT /api/books/:id
exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedBookData = JSON.parse(req.body.book);

        // find book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        book.title = updatedBookData.title;
        book.author = updatedBookData.author;
        book.year = updatedBookData.year;
        book.genre = updatedBookData.genre;

        const updatedBook = await book.save();

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
};



// TODO: add POST /api/books/:id/rating
