const formidable = require('formidable');
const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
const ParkingArea = require("../models/parkingAreaModel");
const ParkingSpot = require("../models/parkingSpotModel");

exports.getParkingSpotsFromArea = catchAsync(async (req, res) => {
  const { id: _id } = req.params;
  const parkingSpot = await ParkingSpot.find({ ParkingArea: _id });
  res.status(200).json(parkingSpot);
});

exports.getAllParkingSpots = catchAsync(async (req, res) => {
  const parkingSpot = await ParkingSpot.find();
  res.status(200).json(parkingSpot);
  res.status(404).json({ message: error.message });
});