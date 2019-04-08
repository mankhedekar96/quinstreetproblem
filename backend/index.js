var express = require("express");
var fs = require("fs");
var app = express();
app.listen(4000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
  var fileData = "";
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS') 

  // Getting the file data as string
  fs.readFile("assets/metro.txt", "utf-8", function(err, buf) {
    fileData=buf.toString();

    res.status(200).json({
      textData:fileData
    })
  });
 });