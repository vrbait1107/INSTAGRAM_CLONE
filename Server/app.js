const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const PORT = 5000;
const conn = mongoose.connect("mongodb://localhost:27017/instagram", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------------------->> ROUTES

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
app.use(signupRouter);
app.use(loginRouter);

mongoose.connection.on("connected", () => {
  console.log("Database is connected");
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
