require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//port
const port = process.env.PORT;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB NOT CONNECTED");
  });

//Routes
app.use(
  "/api",
  authRoutes
);              /*route /api is prefixed to routes in authRoutes i.e /api/aignout */
app.use("/api", userRoutes);

//server start
app.listen(port, () => {
  console.log("server running on port " + port);
});
