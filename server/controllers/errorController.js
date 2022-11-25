/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  console.log('error', message, { error: err });
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  console.log('error', message, { error: err });
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  console.log('error', message, { error: err });
  return new AppError(message, 400);
};


const sendErrorDev = (err, res) => {
  console.log('error', err.message, { ...err });
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
  res.end();
};

const sendErrorProd = (err, res) => {
  console.log('error', err.message, { ...err });
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went very wrong";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(error);
    else if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    else if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
