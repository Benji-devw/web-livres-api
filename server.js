const express = require('express');
const mongoose = require("mongoose")
require('dotenv').config();

const userRouter = require('./router/user.router');
const booksRouter = require('./router/books.router');

// console.log(process.env.NODE_ENV === 'production');
// console.log(process.env.DATABASE_NAME);

mongoose
  .connect(`mongodb://0.0.0.0:27017/${process.env.DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("Connected to mongoDB"); })
  .catch((err) => {
    console.log("Error while DB connecting");
    console.log(err);
  });


const app = express()


// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', userRouter);
app.use('/api/books', booksRouter);
app.use('/api/book', booksRouter);
app.use('/api/books/bestrating', booksRouter);


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
})
