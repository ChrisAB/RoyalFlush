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

    parkingArea.numberOfFreeSpots = parkingArea.totalNumberOfSpots - len(coordinateList);
    parkingArea.save();

    if (files && files.image) {
      await fs.writeFile(`../public/${fields.cameraID}carParkPos`, parkingArea.positionFile);
      const command = spawn("python3", ["utils/pythonScripts/ParkingSpaceDetector.py", `${files.image.filepath}`, `public/${fields.cameraID}carParkPos`]);

      command.stdout.on("data", async (data) => {
        const coordinateList = JSON.parse(`${data}`.split("(").join("[").split(")").join("]"));
        ParkingSpot.updateMany({
          parkingArea: parkingArea._id,
          coordinatesInImage: { x: { $in: coordinateList.map(x => x[0]) }, y: { $in: coordinateList.map(x => x[1]) } }
        },
          { isOccupied: true });
        ParkingSpot.updateMany({
          parkingArea: parkingArea._id,
          coordinatesInImage: { x: { $nin: coordinateList.map(x => x[0]) }, y: { $nin: coordinateList.map(x => x[1]) } }
        },
          { isOccupied: false });

        coordinateList.forEach(i => console.log(`1: ${i[0]} 2: ${i[1]}`));
      });

      command.stderr.on("data", async (data) => {
        console.log(`stderr: ${data}`);
      });

      command.on("close", data => {
        console.log("Command done");
        fs.unlink(`../public/${fields.cameraID}carParkPos`);
        res.status(200).json({ status: 'success', data: {} });
      });
    }
  });
});