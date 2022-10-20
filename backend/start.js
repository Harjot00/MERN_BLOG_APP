const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", blogRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
