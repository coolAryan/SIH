const express = require("express");
var path = require("path");
var User = require("./model/User");
var connect = require("./config/db.config");
const upload = require("./upload");
var multer = require("multer");
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

app.post("/upload", (req, res) => {
  upload(req.body.filename);
  console.log("Upload function Working");
});

app.post("/subscribe", (req, res) => {
  subscribeByEmail(req.body.email);
  res.redirect("/dashboard");
});

app.post("/subscribeByNumber", (req, res) => {
  console.log(req.body, "data from frontend");
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
    console.log(req.body, 1);
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
