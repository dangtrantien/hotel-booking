'use strict';

const Hotel = require('../models/Hotel');
const Transaction = require('../models/Transaction');
const Room = require('../models/Room');

// ==================================================

// Lấy data của các hotel từ database
exports.getHotels = (req, res, next) => {
  Hotel.find()
    .sort({ createdAt: -1 })
    .then((hotels) => res.status(200).json(hotels))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy data của 1 hotel theo _id từ database
exports.getHotelById = (req, res, next) => {
  const hotelId = req.params.hotelId;

  Hotel.findById(hotelId)
    .populate('rooms')
    .then((hotel) => {
      if (!hotel) {
        const error = new Error(
          'Can not find any information about this hotel!'
        );

        error.statusCode = 404;

        throw error;
      }

      // Chỉ lấy title của các room
      const roomTitleList = hotel.rooms.map((room) => room.title);

      res.status(200).json({ ...hotel._doc, rooms: roomTitleList });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy data của các hotel theo city từ database
exports.getCity = (req, res, next) => {
  const city = req.query.city;

  Hotel.find({ city: city })
    .sort({ createdAt: -1 })
    .then((hotels) => res.status(200).json(hotels))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy data của các hotel theo type từ database
exports.getType = (req, res, next) => {
  const type = req.query.type;

  Hotel.find({ type: type })
    .sort({ createdAt: -1 })
    .then((hotels) => res.json(hotels))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy data của các hotel theo top-rating từ database
exports.getTopRating = (req, res, next) => {
  Hotel.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((hotels) => res.json(hotels))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Tìm kiếm các hotel theo điều kiện
exports.postSearch = (req, res, next) => {
  const city = req.body.city;
  const startDate = req.body.startDate;
  const maxPeople = req.body.maxPeople;
  const roomCount = req.body.roomCount;

  Hotel.find({ city: city })
    .populate('rooms')
    .then((hotels) => {
      const hotelList = [];

      hotels.map((hotel) => {
        hotel.rooms.map((room) => {
          // Kiểm tra ngày user muốn đặt vs ngày có room trống
          if (
            new Date(startDate).toISOString() >
              new Date(room.updatedAt).toISOString() &&
            room.roomNumbers.length !== 0
          ) {
            // Kiểm tra số lượng người ở
            if (maxPeople <= room.maxPeople) {
              // Kiểm tra số lượng room
              if (room.roomNumbers.length >= roomCount) {
                hotelList.push(hotel);
              }
            }
          }
        });
      });

      return hotelList;
    })
    .then((result) => {
      if (result.length === 0) {
        const error = new Error('Can not find any suitable hotel!');

        error.statusCode = 404;

        throw error;
      }

      // Lọc các value trùng nhau
      const resData = [...new Set(result)];

      res.status(200).json(resData);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy các room trống theo ngày user muốn đặt
exports.getEmptyRoom = (req, res, next) => {
  const hotelId = req.query.hotelId;
  const dateStart = req.query.dateStart;

  Hotel.findById(hotelId)
    .populate('rooms')
    .then((hotel) => {
      const roomList = [];

      hotel.rooms.map((room) => {
        if (
          new Date(dateStart).toISOString() >
            new Date(room.updatedAt).toISOString() &&
          room.roomNumbers.length !== 0
        ) {
          roomList.push(room);
        }
      });

      return roomList;
    })
    .then((result) => {
      if (result.length === 0) {
        const error = new Error('Can not find any available rooms!');

        error.statusCode = 404;

        throw error;
      }

      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy data của room theo _id từ database
exports.getRoomById = (req, res, next) => {
  const roomId = req.params.roomId;

  // Lấy data hotel chứa current room
  Hotel.find()
    .then((hotels) => {
      const existRoom = hotels.find((hotel) =>
        hotel.rooms.find((r) => r.toString() === roomId)
      );
      let hotelId;

      if (existRoom) {
        hotelId = existRoom._id.toString();
      }

      Room.findById(roomId).then((room) => {
        if (!room) {
          const error = new Error(
            'Can not find any information about this room!'
          );

          error.statusCode = 404;

          throw error;
        }

        res.status(200).json({ ...room._doc, hotelId: hotelId });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy tất cả transaction data của current user từ database
exports.getTransactions = (req, res, next) => {
  Transaction.find({ user: req.userId })
    .populate('user hotel')
    .sort({ createdAt: -1 })
    .then((transactions) => res.status(200).json(transactions))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Booking hotel room
exports.postTransaction = (req, res, next) => {
  const newTransaction = {
    user: req.userId,
    hotel: req.body.hotelId,
    room: req.body.room,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    price: req.body.price,
    payment: req.body.payment,
    status: req.body.status,
  };

  if (!newTransaction.dateStart || !newTransaction.dateEnd) {
    const error = new Error('Please select date!');

    error.statusCode = 422;

    throw error;
  }

  if (newTransaction.room.length === 0) {
    const error = new Error('Please select room!');

    error.statusCode = 422;

    throw error;
  }

  if (!newTransaction.payment) {
    const error = new Error('Please select payment method!');

    error.statusCode = 422;

    throw error;
  }

  const transaction = new Transaction(newTransaction);

  transaction
    .save()
    .then((result) => {
      // Update room sau khi user booking
      result.room.map((r) => {
        Room.findById(r.roomId)
          .then((hotelRoom) => hotelRoom.removeFromRoomNumbers(r.roomNumber))
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }

            next(err);
          });
      });

      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
