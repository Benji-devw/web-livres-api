const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


exports.signup = (req, res) => {
    // console.log(req.body.password);
    bcrypt.hash(req.body.password, 10,)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // save in mogodb
        user.save()
        .then(() => res.status(201).json({message: 'User created!'}))
        .catch(err => res.status(400).json({err}))
    })
    .catch(err => res.status(500).json({err}))
};


exports.login = (req, res) => {
    console.log('LOGIN');
    User.findOne({ email: req.body.email })
    .then((user) => {
        if(user === null) { 
            res.status(401).json({message: 'Invalid email or password!'})
        } else {
            bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if(!valid) {
                return res.status(401).json({message: 'Invalid email or password!'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id}, 
                    process.env.JWT_SECRET,
                    {expiresIn: '1y'} 
                )
            })
          })
          .catch(err => res.status(500).json({err}))
        }
    })
};