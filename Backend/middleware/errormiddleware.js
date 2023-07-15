const ErrorHandler = require("../utils/ErrorHandler");

//no need of this

module.exports = (err, req, res, next) => {
  // Check if the error is an instance of ErrorHandler
  if (err instanceof ErrorHandler) {
    // console.log("err", err.message);
    res.status(err.status).json({
      Error: {
        message: err.message,
        status: err.status,
      },
    });
  } else {
    res.status(500).json({
      Error: {
        message: err.message,
        status: err.status,
      },
    });
  }
  next();
};
