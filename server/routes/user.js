'use strict';

const express = require('express');

const userController = require('../controllers/user');
const auth = require('../middleware/auth');

// ==================================================

const routes = express.Router();

routes.get('/user', auth, userController.getUser);

routes.put('/user', auth, userController.putUser);

routes.post('/login', userController.postLogin);

routes.post('/register', userController.postRegister);

module.exports = routes;
