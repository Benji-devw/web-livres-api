const jwt = require('jsonwebtoken');
 
// FIXME: Problem with authorization header / not exists in chrome
module.exports = (req, res, next) => {
    try {
        // const token = req.headers["Authorization"];
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
       const decodedToken = jwt.verify(token, 'SECRET_KEY');
        //    console.log(decodedToken);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
      res.status(401).json('Requete non authentifiée ! ');
   }
};