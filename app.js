const express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var User = require("./model/User");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

try {
  mongoose.connect(
    "mongodb+srv://khushboo123:SIH123@phantom.agz12to.mongodb.net/authentication"
  );

  var db = mongoose.connection;
  db.on("connected", console.error.bind(console, "MongoDB connection done"));
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
} catch (error) {
  console.log(error);
}

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
        if (password !== userLogin.password) {
          console.log({ message: "Password Mismatch" });
          res.redirect("/");
        }
        console.log({ message: "User signup Success" });
        // redirected to the grid page
        res.redirect("/dashboard");
      } else {
        console.log("Login Details Not Exists");
        res.redirect("/");
      }
    }
  } catch (err) {
    console.error(err);
  }
});

app.get(
  "/",
  (req, res) => res.sendFile(path.join(__dirname + "/public/loginPage.html"))
);
app.listen(port, () => console.log(`App listening on port ${port}!`));
