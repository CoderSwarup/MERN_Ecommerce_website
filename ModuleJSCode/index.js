import app from "./app.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import dbconnection from "./db/conn.js";

//dotenv file configuration
dotenv.config();

//Port
const PORT = process.env.PORT || 3000;

//database connection
dbconnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

// server.close();
