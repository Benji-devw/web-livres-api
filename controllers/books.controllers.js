const Books = require('../models/books.model');

// FIXME: 
exports.getBooks = (req, res) => {
    console.log('GET_BOOKS');
    Books.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
}

