const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const conn = mongoose.connect("mongodb://localhost:27017/instagram", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database is connected");
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
