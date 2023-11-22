const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const mongo = require('./system/db/mongo');

const userRoutes = require('./api/users/route');

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

app.use('/api/user', userRoutes);




app.listen(5000, () => console.log("Example app listening on port 5000!"));
