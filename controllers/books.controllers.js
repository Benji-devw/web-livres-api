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

exports.addBook = (req, res) => {
    console.log('ADD_BOOK');
    Books.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
}





// TODO: add POST /api/books
// TODO: add PUT /api/books/:id
// TODO: add DELETE /api/books/:id
// TODO: add POST /api/books/:id/rating
