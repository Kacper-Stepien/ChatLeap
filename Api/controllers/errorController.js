const AppError = require("./../utils/appError");
const mongoose = require("mongoose");

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data`;
  return new AppError(message, 400, errors);
};

const handleInvalidId = () => {
  const message = "Invalid ID";
  return new AppError(message, 400);
};

const invalidToken = () => {
  const message = `Invalid token`;
  return new AppError(message, 401);
};

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(err.errors && { errors: err.errors }),
  });
};

const checkDBConnection = async (err) => {
  const isConnected = mongoose.connection.readyState;
  if (isConnected === 0) {
    err.message = "Database connection error";
    err.statusCode = 500;
    err.status = "error";
  }
};

module.exports = (err, req, res, next) => {
  checkDBConnection(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  error.message = err.message;
  if (error._message === "User validation failed")
    error = handleValidationError(err);
  if (error.message.startsWith("Validation failed"))
    error = handleValidationError(err);
  if (error.message === "jwt malformed") error = invalidToken();
  if (error.message.startsWith("Cast to Object")) error = handleInvalidId();
  sendError(error, res);
};
