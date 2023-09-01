// Create a middleware to resize the image
const sharp = require("sharp");
const Books = require("../models/books.model");

const uploadSharp = async (req, res, next) => {
  console.log("PASS_IN_SHARP");
  // console.log(req.file);
  try {
    if (req.file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const name = `${uniqueSuffix}-${req.file.originalname.toLowerCase().split(" ").join("-")}`;
       await sharp(req.file.buffer)
        .resize(206, 260)
        .toFile(`./uploads/${name}`);
      req.file = {
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${name}`
      };
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Error with sharp" });
  }
}

module.exports = { uploadSharp };