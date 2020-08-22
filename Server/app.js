const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const conn = mongoose.connect("mongodb://localhost:27017/instagram");

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
