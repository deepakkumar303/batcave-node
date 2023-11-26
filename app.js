const express = require("express");
const app = express();
const multer = require("multer");
const boom = require("@hapi/boom");
const bodyParser = require("body-parser");
const mongo = require("./system/db/mongo");
const errorHandler = require("./system/error/handler");
const logError = require("./system/middleware/log-error");
const userRoutes = require("./api/users/route");
const otpRoute = require("./api/otp/route");
const userCar = require("./api/user-car/route");
const employeeRoute = require("./api/employee/route");
const eventRoute = require("./api/event/route");


require("dotenv").config();

process.on("SIGINT", () => {
  console.log(
    "SIGINT signal received. Shutting down server (gracefully; maybe.)"
  );
  const cleanUp = () => {
    mongo.closeDbConn();
  };

  server.close(() => {
    console.log("Server shut down.");
    cleanUp();
    process.exit();
  });
  // Force close server after 4secs
  setTimeout((e) => {
    console.log("Forcing server to shut down.", e);
    cleanUp();
    process.exit(1);
  }, 4000);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user", userRoutes);
app.use("/api/otp", otpRoute);
app.use("/api/user-car", userCar);
app.use("/api/employee", employeeRoute);
app.use("/api/event", eventRoute);

app.use((req, res, next) => {
  throw boom.notFound("Endpoint Not Found");
});

app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);

app.listen(5000, () => console.log("Example app listening on port 5000!"));
