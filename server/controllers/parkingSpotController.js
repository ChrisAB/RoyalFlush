const formidable = require('formidable');
const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
const ParkingArea = require("../models/parkingAreaModel");
const ParkingSpot = require("../models/parkingSpotModel");

exports.getParkingSpotsFromArea = async (req,res) => {
    try{
        const {id: _id} = req.params;
        const parkingSpot = await ParkingSpot.find({ ParkingArea: _id});
        res.status(200).json(parkingSpot);
    }catch(error){
      res.status(404).json({message : error.message});
    }
  }
exports.getAllParkingSpots = async (req,res) => {
    try{
        const parkingSpot = await ParkingSpot.find();
        res.status(200).json(parkingSpot);
    }catch(error){
      res.status(404).json({message : error.message});
    }
  } 