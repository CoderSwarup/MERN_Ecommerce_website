const app = require("./app");
const dotenv = require("dotenv");
const { dbconnection } = require("./db/conn");
const cloudinary = require("cloudinary");

//dotenv file configuration
dotenv.config();

//Port
const PORT = process.env.PORT || 3000;

//dabase connection
dbconnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
  console.log("Server listenign on port " + PORT);
});

// server.close();
