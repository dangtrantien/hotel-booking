'use strict';

const express = require('express');

const hotelController = require('../controllers/hotel');
const auth = require('../middleware/auth');

// ==================================================

const routes = express.Router();

routes.get('/', hotelController.getHotels);

routes.get('/hotel/:hotelId', hotelController.getHotelById);

routes.get('/empty-room', auth, hotelController.getEmptyRoom);

routes.get('/room/:roomId', auth, hotelController.getRoomById);

routes.get('/city', hotelController.getCity);

routes.get('/type', hotelController.getType);

routes.get('/top-rating', hotelController.getTopRating);

routes.post('/search', hotelController.postSearch);

routes.get('/transactions', auth, hotelController.getTransactions);

routes.post('/transaction', auth, hotelController.postTransaction);

module.exports = routes;
