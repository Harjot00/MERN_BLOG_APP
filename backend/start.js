const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const root = require("path").resolve("../");
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

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(root, "frontend", "build")));
}

app.use("/api", userRouter);
app.use("/api", blogRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(root, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});

const heroku = path.join(__dirname);
console.log(heroku);
