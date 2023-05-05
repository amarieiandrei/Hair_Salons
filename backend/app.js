const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv/config");

// * Import Routes
const profile = require("./routes/profile");
const auth = require("./routes/auth");
const users = require("./routes/users");
const hairsalons = require("./routes/hairsalons");

// * Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(morgan(":url :method"));
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/hairsalons", hairsalons);

// * Authentication

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// * Routes

app.get("/", (req, res) => {
  res.send("Hello, world! :)");
});

// * Connect To Database

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

// * Start Listening to the Server

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
