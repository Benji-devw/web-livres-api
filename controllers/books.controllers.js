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


// TODO: add GET /api/books/bestrating 
// TODO: add POST /api/books
// TODO: add PUT /api/books/:id
// TODO: add DELETE /api/books/:id
// TODO: add POST /api/books/:id/rating
