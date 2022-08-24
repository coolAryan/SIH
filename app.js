const express = require("express");
var path = require("path");
var User = require("./model/User");
var connect = require("./config/db.config");
const uploadFunc = require("./upload");
var multer = require("multer");

// upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, "source.jpg");
  },
});

const upload = multer({ storage: storage });

const {
  subscribeByEmail,
  subscribeByPhoneNumber,
  sendOtp,
} = require("./subscribe");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

connect();
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/Grid.html"));
});

app.get("/checkUpload", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/sample.html"));
});

app.post("/upload", upload.single("uploaded_file"), (req, res) => {
  console.log(req.file);
  uploadFunc();
  res.sendStatus(200);
});

app.post("/subscribe", (req, res) => {
  subscribeByEmail(req.body.email);
  res.sendStatus(200);
});

app.post("/subscribeByNumber", (req, res) => {
  if (!req.body.otp) {
    sendOtp(req.body.phoneNumber);
  } else {
    subscribeByPhoneNumber(req.body.phoneNumber, req.body.otp);
  }
  res.sendStatus(200);
});

app.post("/login", async (req, res) => {
  try {
    var { username, password } = req.body;
    if (username && password) {
      var userLogin = await User.findOne({
        username: username,
      });
      if (userLogin) {
        if (password !== userLogin.password) {
          console.log({ message: "Password Mismatch" });
          res.redirect("/");
        } else {
          console.log({ message: "User signup Success" });
          // redirected to the grid page
          res.redirect("/dashboard");
        }
      } else {
        console.log("Login Details Not Exists");
        res.redirect("/");
      }
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/public/loginPage.html"))
);
app.listen(port, () => console.log(`App listening on port ${port}!`));
