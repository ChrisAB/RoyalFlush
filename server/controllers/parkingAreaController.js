const formidable = require('formidable');
const fs = require('fs');
const { spawn } = require("child_process");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
const ParkingArea = require("../models/parkingAreaModel");
const ParkingSpot = require("../models/parkingSpotModel");

exports.createParkingArea = catchAsync(async (req, res, next) => {

  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err ||
      !fields ||
      !fields.lat || !fields.long || !fields.name || !fields.parkingCategory || !fields.identificationNumber ||
      !files ||
      !files.positionFile) return new AppError(err.message, 400);

    const { lat, long, name, parkingCategory, identificationNumber } = fields;

    const positionFile = await fs.readFileSync(files.positionFile.filepath);
    if (files && files.positionFile) {
      if (await ParkingArea.findOne({ identificationNumber: identificationNumber }) != null)
        return res.status(400).json({ status: 'fail', data: { message: "Parking Area already exists" } });

      const command = spawn("python3", ["utils/pythonScripts/ParkingCarPosDecoder.py", `${files.positionFile.filepath}`]);

      command.stdout.on("data", async (data) => {
        const coordinateList = JSON.parse(`${data}`.split("(").join("[").split(")").join("]").replace(/'/g, "\""));

        const parkingArea = await ParkingArea.create({
          coordinates: {
            lat: lat,
            long: long
          },
          name: name,
          totalNumberOfSpots: coordinateList.length,
          numberOfFreeSpots: 0,
          parkingCategory: parkingCategory,
          positionFile: positionFile,
          identificationNumber: identificationNumber
        });

        coordinateList.forEach((coordinates) => {
          console.log(`Adding parkingSpot (${coordinates[0]}, ${coordinates[1]}, ${coordinates[2]}, ${coordinates[3]}) with identificationNumber ${coordinates[2]}`);
          ParkingSpot.create({
            parkingArea: parkingArea._id,
            coordinatesInImage: {
              X1: coordinates[0],
              Y1: coordinates[1],
              X2: coordinates[2],
              Y2: coordinates[3]
            },
            identificationNumber: coordinates[4],
            isOccupied: false,
          })
        });
      });

      command.stderr.on("data", async (data) => {
        console.log(`stderr: ${data}`);
      });

      command.on("close", data => {
        console.log("Command done");
        res.status(200).json({ status: 'success', data: {} });
      });
    }
  });
});

exports.getParkingArea = catchAsync(async (req, res) => {
  const parkingArea = await ParkingArea.find();
  res.status(200).json(parkingArea);
});
