'use strict';

const mongoose = require('mongoose');

// ==================================================

const Schema = mongoose.Schema;

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Room',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method thêm roomId vào rooms
HotelSchema.methods.addToRooms = function (roomId) {
  const existingRoom = this.rooms.find((r) => r.toString() === roomId);
  const updatedRooms = [...this.rooms];

  if (!existingRoom) {
    updatedRooms.push(roomId);
  }

  this.rooms = updatedRooms;

  return this.save();
};

// Method xóa roomId khỏi rooms
HotelSchema.methods.removeFromRooms = function (roomId) {
  const updatedRooms = this.rooms.filter((r) => r.toString() !== roomId);

  this.rooms = updatedRooms;

  return this.save();
};

module.exports = mongoose.model('Hotel', HotelSchema);
