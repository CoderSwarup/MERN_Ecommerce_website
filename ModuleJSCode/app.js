import express from "express";
import productRouter from "./Routes/productRoutes.js";
import ErrorMiddleware from "./middleware/errormiddleware.js";
import userRouter from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import OrderRouter from "./Routes/orderRoutes.js";
import CategoryRouter from "./Routes/categoryRoute.js";
const app = express();
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import PaymentRouter from "./Routes/PaymentRoute.js";
import passport from "passport";
import "./utils/Passport.js";
import session from "express-session";
import googlerouter from "./Routes/GoogleRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//configure env

//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./Frontend/dist")));

app.use(fileUpload());

//Passprt Middlewaare
app.use(
  session({
    secret: "your-session-secret", // Replace with your session secret
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//error middleware // No need this
// app.use(function (error, rq, res, next) {
//   console.log(error);
// });

// Routes googlke
app.use("/auth", googlerouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);

//rest api
app.use("*", function (req, res) {
  res.sendFile("index.html", { root: "./Frontend/" });
});

export default app;
