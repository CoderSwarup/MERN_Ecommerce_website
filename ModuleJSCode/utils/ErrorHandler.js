class ErrorHandler {
  constructor(status, msg) {
    this.success = false;
    this.status = status;
    this.message = msg;
  }

  static validationerror(message = "all fields Required") {
    return new ErrorHandler(422, message);
  }

  static NotFoundError(message) {
    return new ErrorHandler(404, message);
  }

  static customError(message, statusCode) {
    return new ErrorHandler(statusCode, message);
  }
}

export default ErrorHandler;
