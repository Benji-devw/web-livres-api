const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: {type: String, require},
    title: {type: String, require},
    author: {type: String, require},
    imageUrl: {type: String, require},
    year: {type: Number, require},
    genre: {type: String, require},
    ratings: {type: Array, require},
    averageRating: {type: Number, require},
})

module.exports = mongoose.model('Book', bookSchema);