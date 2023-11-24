'use strict';

const mongoose = require('mongoose');

// ==================================================

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      default: '',
      required: false,
    },
    phoneNumber: {
      type: String,
      default: '',
      required: false,
    },
    cardNumber: {
      type: String,
      default: '',
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
