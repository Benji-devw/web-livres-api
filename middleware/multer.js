const multer = require('multer'); // Importez le middleware multer

// Configuration de multer pour stocker les images dans un dossier spécifique
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log("FILE", file);
//         cb(null, './uploads/'); // Spécifiez le dossier de destination
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname.toLowerCase().split(' ').join('-')); // Générez un nom de fichier unique
//     }
// });

const memoryStorage = multer.memoryStorage();
const upload = multer({
    storage: memoryStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const uploadSharp = upload.single('image'); // Utilisez .single() pour gérer un seul fichier

module.exports = { uploadSharp };
