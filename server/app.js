const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const imageProcessingController = require('./controllers/imageProcessingController');
const parkingAreaController = require('./controllers/parkingAreaController');
const parkingSpotController = require('./controllers/parkingSpotController');
const ParkingSpot = require('./models/parkingSpotModel');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Set security HTTP headers
app.use(helmet());

// Limit request from same user
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api/', limiter);

// Body parser, reading data from body into rq.body
//app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/image/process', imageProcessingController.processImage);
app.post('/api/v1/parkingArea', parkingAreaController.createParkingArea);
app.get('/api/v1/parkingArea',parkingAreaController.getParkingArea);
app.get('/api/v1/parkingSpot/:id',parkingSpotController.getParkingSpotsFromArea);
app.get('/api/v1/parkingSpot/',parkingSpotController.getAllParkingSpots);

app.use('/api/v1/check', (req, res, next) => {
  res.status(200).json({});
});

// 404 Error not found handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling
app.use(globalErrorHandler);

module.exports = app;
