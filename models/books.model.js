const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    // id: {type: String, require},
    userId: {type: String},
    title: {type: String},
    author: {type: String},
    imageUrl: {type: String},
    year: {type: Number},
    genre: {type: String},
    ratings: {type: Array},
    averageRating: {type: Number}
})

module.exports = mongoose.model('Book', bookSchema);