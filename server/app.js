'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');

const adminRoutes = require('./routes/admin');
const hotelRoutes = require('./routes/hotel');
const userRoutes = require('./routes/user');

// ==================================================

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('<h1>Welcome to my server!</h1>');
});
app.use('/admin', adminRoutes);
app.use('/hotels', hotelRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ message: message, data: error.data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.mongodb.net/${process.env.MONGO_DEFAULT_COLLECTION}`
  )
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err));
