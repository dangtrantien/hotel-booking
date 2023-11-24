'use strict';

const mongoose = require('mongoose');

// ==================================================

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    hotel: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Hotel',
    },
    room: [
      {
        roomId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Room',
        },
        roomNumber: {
          type: Number,
          required: true,
        },
      },
    ],
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
