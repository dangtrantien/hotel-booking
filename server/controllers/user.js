'use strict';

const User = require('../models/User');

// ==================================================

// Lấy user hiện đang login theo _id
exports.getUser = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      // Kiểm tra user đã tồn tại hay chưa
      if (!user) {
        const error = new Error('User dose not exist!');

        error.statusCode = 404;

        throw error;
      }

      res.status(200).json(user);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Update user information
exports.putUser = (req, res, next) => {
  const updatedUser = {
    email: req.body.email,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    cardNumber: req.body.cardNumber,
  };

  if (!updatedUser.email) {
    const error = new Error('Email must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  User.findByIdAndUpdate(req.userId, updatedUser)
    .then(() => res.status(200).json({ message: 'Successfully updated!' }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    const error = new Error('Email must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!password) {
    const error = new Error('Password must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  User.findOne({ email: email })
    .then((user) => {
      // Kiểm tra user đã tồn tại hay chưa theo email
      if (!user) {
        const error = new Error('Email dose not exist!');

        error.statusCode = 404;

        throw error;
      }

      // Kiểm tra có đúng password hay không
      if (password !== user.password) {
        const error = new Error('Password dose not match!');

        error.statusCode = 401;

        throw error;
      }

      // Khởi tạo token
      const token = 'UNIQUE_TOKEN_' + email;

      res.status(200).json({ ...user._doc, token: token });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;

  if (!username) {
    const error = new Error('Username must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!email) {
    const error = new Error('Email must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!password) {
    const error = new Error('Password must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  User.findOne({ email: email })
    .then((user) => {
      // Kiểm tra user đã tồn tại hay chưa theo email
      if (user) {
        const error = new Error('Email already exists!');

        error.statusCode = 400;

        throw error;
      }

      const newUser = new User({
        username,
        email,
        password,
        isAdmin,
      });

      return newUser.save();
    })
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
