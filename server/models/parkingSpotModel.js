const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSpotSchema = new Schema({
  parkingArea: { type: ObjectId, ref: 'ParkingArea', required: true },
  coordinatesInImage: { x: { type: Number, required: true }, y: { type: Number, required: true } },
  identificationNumber: { type: String, required: true },
  isOccupied: { type: Boolean, required: true },
  isPaid: { type: Boolean, required: false } //As Ideea - Option to pay via APP/website
});

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);

module.exports = ParkingSpot;
