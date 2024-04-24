const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cors = require("cors");
const cookie = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookie());
app.use(express.json());

const data = require("./data/data.json");
const { json } = require("stream/consumers");
const cookieParser = require("cookie-parser");

let users = [];

app.get("/promotions", function (req, res) {
  res.json(data);
});

app.get("/promotions/:id", function (req, res) {
  const id = req.params.id;
  const found = data.promotions.find((element) => element.id == id);
  if (found == undefined) {
    res.json({ message: "not found" });
  } else res.json(found);
});

app.get("/products/:id", function (req, res) {
  const id = req.params.id;
  const found = data.products.find((element) => element.id == id);
  if (found == undefined) {
    res.json({ message: "not found" });
  } else res.json(found);
});

app.post("/createUser", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (users.length < 1) {
    users.push({ email: email, password: password });
    console.log(users);
    res.json({ status: "registered" });
  } else {
    let exist = false;
    users.forEach((element) => {
      if (element.email == email) {
        exist = true;
      }
    });
    if (exist) {
      res.json({ status: "user already exists" });
    } else {
      users.push({ email: email, password: password });
      console.log(users);
      res.json({ status: "registered" });
    }
  }
});

app.post("/loginUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let userExist = users.find((item) => item.email == email);
  if (userExist) {
    let canLogin = false;
    users.forEach((element) => {
      if (element.email == email && element.password == password) {
        canLogin = true;
      }
    });
    if (canLogin) {
      res.cookie("email", email, { httpOnly: true });
      res.json({ status: "logged", email: email });
    } else res.json({ status: "notlogged" });
  } else res.json({ status: "notlogged" });
});

app.post("/logoutUser", (req, res) => {
  res.clearCookie("email");
  res.json({ status: "logout" });
});

app.post("/getCurrentUser", (req, res) => {
  const email = req.cookies.email;
  let userExist = users.find((item) => item.email == email);
  console.log(userExist);
  if (userExist) {
    res.json({ status: "authorized", email: email });
  } else {
    res.json({ status: "not_authorized" });
  }
});

app.listen(PORT, function () {
  console.log("start");
});
