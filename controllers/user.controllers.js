const bcrypt = require('bcrypt');

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
    // res.send('test')
};

exports.login = (req, res) => {

};