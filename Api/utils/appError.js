class AppError extends Error {
  // Custom error class
  constructor(message, statusCode, errors = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errors = errors;
  }
}

module.exports = AppError;
