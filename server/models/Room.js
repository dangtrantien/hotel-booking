'use strict';

const mongoose = require('mongoose');

// ==================================================

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        type: Number,
        required: true,
      },
    ],
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method xóa số phòng mà user booking
RoomSchema.methods.removeFromRoomNumbers = function (roomNumber) {
  const updatedRoomNumbers = [...this.roomNumbers].filter(
    (rNumber) => rNumber !== roomNumber
  );

  this.roomNumbers = updatedRoomNumbers;

  return this.save();
};

module.exports = mongoose.model('Room', RoomSchema);
