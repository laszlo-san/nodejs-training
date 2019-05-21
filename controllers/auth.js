/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator/check');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statuCoda = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, name, password } = req.body;
  brcypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      const newError = err;
      if (!newError.status) {
        newError.statusCode = 500;
      }
      next(newError);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return brcypt.compare(password, loadedUser.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'sadfl4lkjlkdjfoihoioobgobbkjkjiIEJIOfds44tg4io+Rhngoi4tfgfgv',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      const newError = err;
      if (!newError.status) {
        newError.statusCode = 500;
      }
      next(newError);
    });
};
