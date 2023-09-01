const fs = require("fs");
const Books = require("../models/books.model");
const sharp = require("sharp");

exports.getBooks = (req, res) => {
  console.log("GET_BOOKS");
  Books.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getBook = (req, res) => {
  console.log("GET_BOOK_BY_ID");
  Books.findOne({ _id: req.params.id })
    .then((data) => {
      if (data) return res.status(200).json(data);
      return res.status(404).json({ error: "Book not found !" });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getBestRating = (req, res) => {
  console.log("GET_BEST_RATING");
  Books.aggregate([
    {
      $unwind: "$ratings", // Décompose le tableau de notes en documents individuels
    },
    {
      $group: {
        _id: "$_id",
        averageRating: { $avg: "$ratings.grade" }, // Calcule la moyenne des notes
        title: { $first: "$title" },
        author: { $first: "$author" },
        imageUrl: { $first: "$imageUrl" },
      },
    },
    {
      $sort: {
        averageRating: -1, // Trie par note moyenne décroissante
      },
    },
    {
      $limit: 3,
    },
  ])
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.addBook = async (req, res) => {
  console.log("ADD_BOOK");
  // console.log(req.headers.authorization);
  // console.log(req.file);

  try {
    const bookData = JSON.parse(req.body.book);

    const book = new Books({ ...bookData, imageUrl: req.file.imageUrl });
    const savedBook = await book.save();

    res.status(200).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Add fail !" });
  }
};

exports.deleteBook = async (req, res) => {
  console.log("DELETE_BOOK");

  try {
    const book = await Books.findOne({
      _id: req.params.id,
      userId: req.auth.userId,
    });
    if (!book) return res.status(404).json({ error: "Book not found !" });
    // Delete the associated image if it exists
    if (book.imageUrl !== "https://via.placeholder.com/206x260") {
      // TODO: find better way to delete the image
      let decoup = book.imageUrl.split("/");
      const imageName = decoup[decoup.length - 1];
      const imagePath = `./uploads/${imageName}`;
      fs.unlinkSync(imagePath);
    }
    book.deleteOne();
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete fail !" });
  }
};

exports.updateBook = async (req, res) => {
  console.log("UPDATE_BOOK");
  // console.log(req.file);

  try {
    if (req.file) {
      const book = await Books.findOne({
        _id: req.params.id,
        userId: req.auth.userId,
      });
      if (!book) return res.status(404).json({ error: "Book not found !" });

      // Delete the old image if it exists
      if (book.imageUrl !== "https://via.placeholder.com/206x260") {
        let decoup = book.imageUrl.split("/");
        const imageName = decoup[decoup.length - 1];
        const imagePath = `./uploads/${imageName}`;
        fs.unlinkSync(imagePath);
      }
    }

    // Create the book object
    const bookOject = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: req.file.imageUrl,
        }
      : { ...req.body };

    // Delete the _id property from the book object
    delete bookOject._userId;

    // Update the book
    await Books.updateOne(
      { _id: req.params.id },
      {
        ...bookOject,
        _id: req.params.id,
      }
    );

    res.status(200).json({ message: "Update book Done !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update fail !" });
  }
};

exports.addRating = async (req, res) => {
  console.log("ADD_RATING");
  console.log(req.body);
  try {
    const book = await Books.findOne({ _id: req.params.id });
    console.log(book);
    const rating = { ...req.body };
    book.ratings.push(rating);
    await book.save();
    console.log(book);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Add rating fail !" });
  }
};
