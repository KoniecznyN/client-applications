const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cors = require("cors")

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

const data = require("./data/data.json");
const { json } = require("stream/consumers");

let users = []

app.get("/promotions", function (req, res) {
    res.json(data)
})

app.get("/promotions/:id", function (req, res) {
    const id = req.params.id
    const found = data.promotions.find((element) => element.id == id)
    if (found == undefined) {
        res.json({ message: "not found" })
    } else res.json(found)
})

app.get("/products/:id", function (req, res) {
    const id = req.params.id
    const found = data.products.find((element) => element.id == id)
    if (found == undefined) {
        res.json({ message: "not found" })
    } else res.json(found)
})

app.post("/createUser", function (req, res) {
    const email = req.body.email
    const password = req.body.password
    users.push({ email: email, password: password })
    console.log(users);
    res.json({ status: "registered" })
})

app.listen(PORT, function () {
    console.log("start");
});