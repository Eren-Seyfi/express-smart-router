const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ stats: "v2 stats info" });
});

module.exports = router;
