const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
/**Run Express Package */
const app = express();
//const fileUpload = require("express-fileupload");
const path = require("path");

/**Get config.env variables */
require("dotenv").config({
  path: "./config/config.env",
});

/**Connect Database */
connectDB();

/**Use Body parser for getting inputs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable("etag");
/**Config only for development */
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use("/uploads", express.static("uploads"));
  app.use(morgan("dev"));
  //Morgan give information about each request
  //CORS allows to deal with rect for loaclhost at port 3000 without anu problems
  //app.use(fileUpload());
}

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.HOST_CLIENT_URL,
    })
  );
  app.use("/uploads", express.static("uploads"));
  //Morgan give information about each request
  //CORS allows to deal with rect for loaclhost at port 3000 without anu problems
  //app.use(fileUpload());
}

/*Load all routes */
const authRouter = require("./routes/auth.route");
const categoryRouter = require("./routes/category.route");
const hashtagRoute = require("./routes/hashtag.route");
const postRouter = require("./routes/post.route");
const sideadRouter = require("./routes/sidead.route");
const mainadRoute = require("./routes/mainad.route");
const userRoute = require("./routes/user.route")


/**Use the loaded routes */
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", postRouter);
app.use("/api", sideadRouter);
app.use("/api", mainadRoute);
app.use("/api", hashtagRoute);
app.use("/api", userRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

//Port from env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Running at port - ${PORT}`);
  //console.log(`${__dirname}`);
});
