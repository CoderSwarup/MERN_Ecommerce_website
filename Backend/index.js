const app = require("./app");
const dotenv = require("dotenv");
const { dbconnection } = require("./db/conn");

//dotenv file configuration
dotenv.config();

//Port
const PORT = process.env.PORT || 3000;

//dabase connection
dbconnection();

app.listen(PORT, () => {
  console.log("Server listenign on port " + PORT);
});
