const formidable = require('formidable');
const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
const ParkingArea = require("../models/parkingAreaModel");

exports.createParkingArea = catchAsync(async (req, res, next) => {

  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err ||
      !fields ||
      !fields.lat || !fields.long || !fields.name || !fields.totalNumberOfSpots || !fields.parkingCategory || !fields.identificationNumber ||
      !files ||
      !files.positionFile) return new AppError(err.message, 400);

    const { lat, long, name, totalNumberOfSpots, parkingCategory, identificationNumber } = fields;

    console.log(files.positionFile);
    return;
    if (files && files.positionFile) {

      ParkingArea.create({
        coordinates: {
          lat: lat,
          long: long
        },
        name: name,
        totalNumberOfSpots: totalNumberOfSpots,
        parkingCategory: parkingCategory,
        positionFile: files.positionFile,
        identificationNumber: identificationNumber
      });
    }
  });

  res.status(200).json({ status: 'success', data: {} });
});