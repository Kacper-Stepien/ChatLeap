const AppError = require("./../utils/appError");

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data`;
  return new AppError(message, 400, errors);
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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  error.message = err.message;
  if (error._message === "User validation failed")
    error = handleValidationError(err);
  if (error.message === "jwt malformed") error = invalidToken();
  sendError(error, res);
};
