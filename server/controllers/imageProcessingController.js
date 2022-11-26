const formidable = require('formidable');
const fs = require('fs');
const { spawn } = require("child_process");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
const ParkingArea = require("../models/parkingAreaModel");
const ParkingSpot = require("../models/parkingSpotModel");

exports.processImage = catchAsync(async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err ||
      !fields ||
      !fields.cameraID ||
      !files ||
      !files.image) return new AppError(err.message, 400);

    let parkingArea = await ParkingArea.findOne({ identificationNumber: fields.cameraID });
    if (!parkingArea)
      return res.status(404).json({ status: "notfound", data: {} });

    if (files && files.image) {
      fs.writeFileSync(`public/${fields.cameraID}carParkPos`, parkingArea.positionFile);
      const command = spawn("python3", ["utils/pythonScripts/ParkingCarPosDecoder.py", `public/${fields.cameraID}carParkPos`]);

      command.stdout.on("data", async (data) => {
        const coordinateList = JSON.parse(`${data}`.replace(/\(/g, "\[").replace(/\)/g, "\]").replace(/'/g, "\""));

        parkingArea.numberOfFreeSpots = parkingArea.totalNumberOfSpots - coordinateList.length;
        parkingArea.save();

        ParkingSpot.updateMany({
          parkingArea: parkingArea._id,
          coordinatesInImage: {
            X1: { $in: coordinateList.map(x => x[0]) }, Y1: { $in: coordinateList.map(x => x[1]) },
            X2: { $in: coordinateList.map(x => x[2]) }, Y2: { $in: coordinateList.map(x => x[3]) }
          }
        },
          { isOccupied: true });
        ParkingSpot.updateMany({
          parkingArea: parkingArea._id,
          coordinatesInImage: {
            X1: { $nin: coordinateList.map(x => x[0]) }, Y1: { $nin: coordinateList.map(x => x[1]) },
            X2: { $nin: coordinateList.map(x => x[2]) }, Y2: { $nin: coordinateList.map(x => x[3]) }
          }
        },
          { isOccupied: false });
      });

      command.stderr.on("data", async (data) => {
        console.log(`stderr: ${data}`);
      });

      command.on("close", data => {
        console.log("Command done");
        fs.unlinkSync(`public/${fields.cameraID}carParkPos`);
        res.status(200).json({ status: 'success', data: {} });
      });
    }
  });
});