const express = require('express');
const mongoose = require("mongoose")

const userRouter = require('./router/user.router');
const booksRouter = require('./router/books.router');


mongoose
  .connect("mongodb://0.0.0.0:27017/web-livres", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("Connected to mongoDB"); })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
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
