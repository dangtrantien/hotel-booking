'use strict';

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');

// ==================================================

// Lấy tất cả các data của các user từ database
exports.getUsers = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let skip;

  if (page >= 1 && limit) {
    skip = (page - 1) * limit;
  }

  User.aggregate([
    {
      $facet: {
        data: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
        totalCount: [{ $count: 'totalCount' }],
      },
    },
  ])
    .then((users) =>
      res.status(200).json({
        data: users[0].data,
        total: users[0].totalCount[0].totalCount,
      })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy doanh thu TB hàng tháng
exports.getEarnings = (req, res, next) => {
  Transaction.find()
    .then((transactions) => {
      let totalBalance = 0;

      // Tính tổng thu nhập trong cùng 1 tháng
      transactions.map((transaction) => {
        if (
          new Date(transaction.createdAt).getMonth() ===
            new Date().getMonth() &&
          new Date(transaction.createdAt).getDate() >= 1 &&
          new Date(transaction.createdAt).getDate() <= 30
        ) {
          totalBalance = totalBalance + transaction.price;
        }
      });

      const TB = totalBalance / 30;

      return TB.toFixed(2);
    })
    .then((result) => res.status(200).json({ total: result }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy tổng doanh thu
exports.getBalances = (req, res, next) => {
  Transaction.find()
    .then((transactions) => {
      let totalBalance = 0;

      transactions.map((transaction) => {
        totalBalance = totalBalance + transaction.price;
      });

      return totalBalance;
    })
    .then((result) => res.status(200).json({ total: result }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy 8 transaction mới nhất
exports.getRecentTransactions = (req, res, next) => {
  Transaction.find()
    .populate('user hotel')
    .sort({ createdAt: -1 })
    .limit(8)
    .then((transactions) => res.status(200).json(transactions))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy tất cả các data của các hotel từ database
exports.getHotels = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let skip;

  if (page >= 1 && limit) {
    skip = (page - 1) * limit;
  }

  Hotel.aggregate([
    {
      $facet: {
        data: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: 'rooms',
              localField: 'rooms',
              foreignField: '_id',
              as: 'rooms',
            },
          },
        ],
        totalCount: [{ $count: 'totalCount' }],
      },
    },
  ])
    .then((hotels) =>
      res.status(200).json({
        data: hotels[0].data,
        total: hotels[0].totalCount[0].totalCount,
      })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Add hotel
exports.postHotel = (req, res, next) => {
  const newHotel = {
    name: req.body.name,
    type: req.body.type,
    title: req.body.title,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    photos: req.body.photos,
    desc: req.body.desc,
    featured: req.body.featured,
    cheapestPrice: req.body.cheapestPrice,
  };

  if (!newHotel.name) {
    const error = new Error('Product name must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.type) {
    const error = new Error('Product type must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.title) {
    const error = new Error('Product title must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.city) {
    const error = new Error('City must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.address) {
    const error = new Error('Product address must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.distance) {
    const error = new Error('Distance must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (newHotel.photos.length === 0) {
    const error = new Error('Product images must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.desc) {
    const error = new Error('Product description must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newHotel.cheapestPrice) {
    const error = new Error('Please enter product price!');

    error.statusCode = 422;

    throw error;
  }

  const hotel = new Hotel(newHotel);

  hotel
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Edit hotel
exports.putHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  const updatedHotel = {
    name: req.body.name,
    type: req.body.type,
    title: req.body.title,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    photos: req.body.photos,
    desc: req.body.desc,
    featured: req.body.featured,
    cheapestPrice: req.body.cheapestPrice,
  };

  if (!updatedHotel.name) {
    const error = new Error('Product name must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.type) {
    const error = new Error('Product type must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.title) {
    const error = new Error('Product title must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.city) {
    const error = new Error('City must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.address) {
    const error = new Error('Product address must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.distance) {
    const error = new Error('Distance must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (updatedHotel.photos.length === 0) {
    const error = new Error('Product images must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.desc) {
    const error = new Error('Product description must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotel.cheapestPrice) {
    const error = new Error('Please enter product price!');

    error.statusCode = 422;

    throw error;
  }

  Hotel.findByIdAndUpdate(hotelId, updatedHotel)
    .then(() =>
      res.status(200).json({ messsage: 'Successfully edit product!' })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Delete hotel
exports.deleteHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;

  Transaction.find({ status: { $in: ['Booked', 'Checkin'] } })
    .select('hotel')
    .then((transactions) => {
      // Kiểm tra xem user có đang book current hotel hay không
      const bookedHotel = transactions.find(
        (t) => t.hotel.toString() === hotelId
      );

      if (bookedHotel) {
        const error = new Error(
          'This hotel is currently in a transaction. You can not delete this!'
        );

        error.statusCode = 400;

        throw error;
      }

      return Hotel.findByIdAndRemove(hotelId);
    })
    .then(() => res.status(200).json({ message: 'Successfully deleted!' }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy tất cả các data của các room từ database
exports.getRooms = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let skip;

  if (page >= 1 && limit) {
    skip = (page - 1) * limit;
  }

  Room.aggregate([
    {
      $facet: {
        data: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
        totalCount: [{ $count: 'totalCount' }],
      },
    },
  ])
    .then((rooms) =>
      res.status(200).json({
        data: rooms[0].data,
        total: rooms[0].totalCount[0].totalCount,
      })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Add room
exports.postRoom = (req, res, next) => {
  const newRoom = {
    title: req.body.title,
    roomNumbers: req.body.roomNumbers,
    maxPeople: req.body.maxPeople,
    desc: req.body.desc,
    price: req.body.price,
  };
  const hotelId = req.body.hotelId;

  const allNumber = newRoom.roomNumbers.every((value) => !isNaN(value));

  if (!newRoom.title) {
    const error = new Error('Room title must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (newRoom.roomNumbers.length === 0) {
    const error = new Error('Room numbers must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!allNumber) {
    const error = new Error('Please enter only number in rooms field!');

    error.statusCode = 422;

    throw error;
  }

  if (!newRoom.maxPeople) {
    const error = new Error('Please enter room max people!');

    error.statusCode = 422;

    throw error;
  }

  if (!newRoom.desc) {
    const error = new Error('Room description must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!newRoom.price) {
    const error = new Error('Please enter room price!');

    error.statusCode = 422;

    throw error;
  }

  if (!hotelId) {
    const error = new Error('Please select hotel!');

    error.statusCode = 422;

    throw error;
  }

  const room = new Room(newRoom);

  room
    .save()
    .then((room) => {
      // Thêm roomId vào data của hotel
      return Hotel.findById(hotelId).then((hotel) =>
        hotel.addToRooms(room._id.toString())
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Edit room
exports.putRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  const updatedRoom = {
    title: req.body.title,
    roomNumbers: req.body.roomNumbers,
    maxPeople: req.body.maxPeople,
    desc: req.body.desc,
    price: req.body.price,
  };
  const updatedHotelId = req.body.hotelId;

  if (!updatedRoom.title) {
    const error = new Error('Room title must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (updatedRoom.roomNumbers.length === 0) {
    const error = new Error('Room numbers must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedRoom.maxPeople) {
    const error = new Error('Please enter room max people!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedRoom.desc) {
    const error = new Error('Room description must not be empty!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedRoom.price) {
    const error = new Error('Please enter room price!');

    error.statusCode = 422;

    throw error;
  }

  if (!updatedHotelId) {
    const error = new Error('Please select hotel!');

    error.statusCode = 422;

    throw error;
  }

  Hotel.find()
    .then((hotels) => {
      // Tìm hotel chứa room
      const existingHotel = hotels.find((hotel) =>
        hotel.rooms.find((r) => r.toString() === roomId)
      );

      if (existingHotel._id.toString() !== updatedHotelId) {
        // Xóa roomId khỏi data của hotel cũ.
        existingHotel.removeFromRooms(roomId);

        // Thêm roomId vào data của hotel mới
        Hotel.findById(updatedHotelId)
          .then((hotel) => hotel.addToRooms(roomId))
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }

            next(err);
          });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });

  Room.findByIdAndUpdate(roomId, updatedRoom)
    .then(() => res.status(200).json({ messsage: 'Successfully edit room!' }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Delete room
exports.deleteRoom = (req, res, next) => {
  const roomId = req.params.roomId;

  Transaction.find({ status: { $in: ['Booked', 'Checkin'] } })
    .select('room')
    .then((transactions) => {
      // Kiểm tra xem user có đang book current room hay không
      const bookedRoom = transactions.find((t) =>
        t.room.find((r) => r.roomId.toString() === roomId)
      );

      if (bookedRoom) {
        const error = new Error(
          'This room is currently in a transaction. You can not delete this!'
        );

        error.statusCode = 400;

        throw error;
      }

      // Xóa room khỏi data của hotel chứa nó
      Hotel.find()
        .then((hotels) => {
          const existingHotel = hotels.find((hotel) =>
            hotel.rooms.find((r) => r.toString() === roomId)
          );

          if (existingHotel) {
            existingHotel.removeFromRooms(roomId);
          }
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }

          next(err);
        });

      Room.findByIdAndRemove(roomId)
        .then(() => res.status(200).json({ message: 'Successfully deleted!' }))
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }

          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

// Lấy tất cả các data của các transaction từ database
exports.getTransactions = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let skip;

  if (page >= 1 && limit) {
    skip = (page - 1) * limit;
  }

  Transaction.aggregate([
    {
      $facet: {
        data: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $lookup: {
              from: 'hotels',
              localField: 'hotel',
              foreignField: '_id',
              as: 'hotel',
            },
          },
        ],
        totalCount: [{ $count: 'totalCount' }],
      },
    },
  ])
    .then((transactions) =>
      res.status(200).json({
        data: transactions[0].data,
        total: transactions[0].totalCount[0].totalCount,
      })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
