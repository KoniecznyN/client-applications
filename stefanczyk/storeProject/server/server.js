const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cors = require("cors")

app.use(cors())

const data = require("./data/data.json")

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

app.listen(PORT, function () {
    console.log("start");
});