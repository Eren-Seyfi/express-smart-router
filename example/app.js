const express = require("express");
const path = require("path");
const smartRouter = require("../index");

const app = express();
app.use(express.json());

const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
};

smartRouter(app, path.join(__dirname, "routes"), {
  baseRoute: "/api",
  middleware: [logger],
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
