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

const axios = require("axios");

console.log('check');

require("dotenv").config();

// const mailjet = require('node-mailjet').connect(
//   '6ffbcc5cffa9fdd9b5c6514d313baf7a',
//   '158fa1814b06c9a743886c3de20f2589'
// )

const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

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
app.get("/get", (req, res) => res.send("Hello World!"));

app.use("/api/user", userRoutes);
app.use("/api/otp", otpRoute);
app.use("/api/user-car", userCar);
app.use("/api/employee", employeeRoute);
app.use("/api/event", eventRoute);

app.get("/send-email", async (req, res) => {
  const toEmail = "kumard312@gmail.com";
  const subject = "Test Email";
  const text = "Hello, this is a test email from Mailjet!";

  await sendEmail(toEmail, subject, text);

  res.send("Email sent successfully!");
});

const sendEmail = async (toEmail, subject, text) => {
  // const { apiKey, apiSecret } = mailjetConfig;

  // const mailjetApiUrl = 'https://api.mailjet.com/v3.1/send';

  // const payload = {
  //   Messages: [
  //     {
  //       From: {
  //         Email: 'kumard312@gmail.com',
  //         Name: 'Your Name',
  //       },
  //       To: [
  //         {
  //           Email: toEmail,
  //         },
  //       ],
  //       Subject: subject,
  //       TextPart: text,
  //     },
  //   ],
  // };

  // try {
  //   const response = await axios.post(mailjetApiUrl, payload, {
  //     auth: {
  //       username: '6ffbcc5cffa9fdd9b5c6514d313baf7a',
  //       password: '158fa1814b06c9a743886c3de20f2589',
  //     },
  //   });

  //   console.log('Email sent:', response.data);

  // } catch (error) {
  //   console.error('Error sending email:', error.response ? error.response.data : error.message);
  // }

  // const request = mailjet.post('send').request({
  //   FromEmail: 'kumard312@gmail.com',
  //   FromName: 'Mailjet Pilot',
  //   Subject: 'Your email flight plan!',
  //   'Text-part':
  //     'Dear passenger, welcome to Mailjet! May the delivery force be with you!',
  //   'Html-part':
  //     '<h3>Dear passenger, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!<br />May the delivery force be with you!',
  //   To: 'Name <kumard312@gmail.com>',
  //   CC: '',
  // })
  // request
  //   .then(result => {
  //     console.log(result.body)
  //   })
  //   .catch(err => {
  //     console.log(err.statusCode)
  //   })

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "kumard312@gmail.com",
          Name: "Mailjet Pilot",
        },
        To: [
          {
            Email: "kumard312@gmail.com",
            Name: "passenger 1",
          },
        ],
        Subject: "Your email flight plan!",
        TextPart:
          "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

app.use((req, res, next) => {
  throw boom.notFound("Endpoint Not Found");
});

app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);

app.listen(8000, () => console.log("Example app listening on port 8000!"));
