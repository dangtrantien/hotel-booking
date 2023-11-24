'use strict';

const express = require('express');

const adminController = require('../controllers/admin');
const auth = require('../middleware/auth');

// ==================================================

const routes = express.Router();

routes.get('/users', auth, adminController.getUsers);

routes.get('/earnings', auth, adminController.getEarnings);

routes.get('/balances', auth, adminController.getBalances);

routes.get('/recentTransactions', auth, adminController.getRecentTransactions);

routes.get('/hotels', auth, adminController.getHotels);

routes.post('/hotel', auth, adminController.postHotel);

routes.put('/hotel/:hotelId', auth, adminController.putHotel);

routes.delete('/hotel/:hotelId', auth, adminController.deleteHotel);

routes.get('/rooms', auth, adminController.getRooms);

routes.post('/room', auth, adminController.postRoom);

routes.put('/room/:roomId', auth, adminController.putRoom);

routes.delete('/room/:roomId', auth, adminController.deleteRoom);

routes.get('/transactions', auth, adminController.getTransactions);

module.exports = routes;
