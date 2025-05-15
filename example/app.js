const express = require("express");
const path = require("path");
const loadRoutes = require("../index");

const app = express();

app.use(express.json());

// Tüm route'ları otomatik olarak yükle
loadRoutes(app, path.join(__dirname, "routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
