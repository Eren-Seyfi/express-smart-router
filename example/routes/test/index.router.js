const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Test Page");
});

module.exports = router;
