const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");

const foldernames = fs.readdirSync(__dirname + "/static/cwiczenia");
let arr = [];
for (let i = 0; i < foldernames.length; i++) {
  const filenames = fs.readdirSync(
    __dirname + `/static/cwiczenia/${foldernames[i]}`
  );
  arr[i] = filenames;
}
const objectD = { folders: foldernames, lessons: arr };

app.get("/fetch", function (req, res) {
  res.send(objectD);
});

app.use(express.static("static"));
app.use(express.static("static/cwiczenia/lekcja-1-directives"));
app.use(express.static("static/cwiczenia/lekcja-2-arrays-methods-computed"));
app.use(express.static("static/cwiczenia/lekcja-3-events-methods"));
app.use(express.static("static/cwiczenia/lekcja-4-forms"));
app.use(express.static("static/cwiczenia/lekcja-5-components"));
app.use(express.static("static/cwiczenia/lekcja-6-templates-props-emit"));
app.listen(PORT, function () {
  console.log("start serwera");
});
