const mongoose = require("mongoose");

exports.dbconnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection Successful ");
    })
    .catch((err) => {
      console.log("error : " + err);
    });
};
