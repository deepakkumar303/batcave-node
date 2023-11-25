const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const boom = require("@hapi/boom");
const bodyParser = require('body-parser');
const mongo = require('./system/db/mongo');
const errorHandler = require('./system/error/handler');

const userRoutes = require('./api/users/route');
const otpRoute = require('./api/otp/route');
const logError = require("./system/middleware/log-error");

process.on('SIGINT', () => {
  console.log('SIGINT signal received. Shutting down server (gracefully; maybe.)');
  const cleanUp = () => {
      mongo.closeDbConn();
  };

  server.close(() => {
      console.log('Server shut down.');
      cleanUp();
      process.exit();
  });
  // Force close server after 4secs
  setTimeout((e) => {
      console.log('Forcing server to shut down.', e);
      cleanUp();
      process.exit(1);
  }, 4000)
});

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.get("/", (req, res) => res.send("Hello World!"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Check if the directory exists, create it if not
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Create Multer instance
const upload = multer({
  storage: storage,
});

app.use('/api/user', userRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const filePath = path.join('uploads', req.file.filename);
  res.json({ message: 'File uploaded successfully', filename: req.file.filename, filePath });
});

app.use('/api/otp', otpRoute);

app.post('/generate-otp', (req, res) => {
  // Generate a 6-digit numeric OTP
  // const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  const otp = generateUniqueNumericOTP(6);
  // const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });


  // You can send this OTP through SMS, email, or any other method of your choice

  res.json({ otp });
});

const usedOTPs = new Set();
function generateUniqueNumericOTP(length) {
  const digits = '0123456789';
  let otp = '';

  do {
    otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
  } while (usedOTPs.has(otp));

  usedOTPs.add(otp);

  return otp;
}

app.use((req, res, next) => {
  throw boom.notFound('Endpoint Not Found');
});

app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);




app.listen(5000, () => console.log("Example app listening on port 5000!"));
