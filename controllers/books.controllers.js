const fs = require('fs');
const path = require('path');
const Books = require('../models/books.model');


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


// TODO: Check for multer image upload
exports.addBook = async (req, res) => {
    console.log('ADD_BOOK');
    // console.log(req.headers.authorization);
    console.log(req.file);
    
    try {
        const bookData = JSON.parse(req.body.book);
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        // const imageUrl = req.file ? req.file.path : "https://via.placeholder.com/206x260";
        // bookData.imageUrl = "https://via.placeholder.com/206x260";
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
        const book = await Books.findByIdAndDelete(req.params.id);
        // Delete the associated image if it exists
        if (book.imageUrl) {
            let decoup = book.imageUrl.split('/')
            fs.unlinkSync(`./uploads/${decoup[4]}`)
        }
        
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete fail !' });
    }
}



exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedBookData = JSON.parse(req.body.book);

        // Cherchez le livre
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        // Mettez à jour les champs pertinents du livre
        book.title = updatedBookData.title;
        book.author = updatedBookData.author;
        book.year = updatedBookData.year;
        book.genre = updatedBookData.genre;

        // Enregistrez le livre mis à jour
        const updatedBook = await book.save();

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
};



// TODO: add PUT /api/books/:id
// TODO: add POST /api/books/:id/rating
