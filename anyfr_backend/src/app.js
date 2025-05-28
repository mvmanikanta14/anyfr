const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const basicParamEntitiesRoutes = require("./routes/basicparamentities");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/basicparamentities", basicParamEntitiesRoutes);

module.exports = app; // Export app for testing
