'use strict';

const User = require('../models/User');

// ==================================================

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  // Kiểm tra xem có token hay không
  if (!authHeader) {
    const error = new Error('Unauthorized');

    error.statusCode = 401;

    throw error;
  }

  const token = authHeader.split(' ')[1].split('_')[2];

  User.findOne({ email: token })
    .then((user) => {
      // Kiểm tra xem token có đúng không
      if (!user) {
        const error = new Error('User not found!');

        error.statusCode = 404;

        throw error;
      }

      req.userId = user._id.toString();

      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
