const ErrorHandler = require("./ErrorHandler");

exports.ThrowError = (error, res, msg) => {
  if (error instanceof ErrorHandler) {
    res.status(error.status).send(error);
  } else {
    // console.log("Error is gotten");
    // console.log(error);
    res.status(400).send({
      success: false,
      message: `Something Wrong in ${msg} Please Try Later`,
    });
  }
};
