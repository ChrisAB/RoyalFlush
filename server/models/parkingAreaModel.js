const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingAreaSchema = new Schema({
  coordinates: {
    lat: { type: String, required: true },
    long: { type: String, required: true }
  },
  name: { type: String, required: true },
  totalNumberOfSpots: { type: Number, required: true, min: 1, max: 2048 },
  numberOfFreeSpots: { type: Number, required: true, min: 1, max: 2048 },
  parkingCategory: { type: String },
  positionFilePath: { type: String, required: true },
  identificationNumber: { type: String, required: true }
});

const ParkingArea = mongoose.model("ParkingArea", parkingAreaSchema);

module.exports = ParkingArea;
