// required imports
var express = require("express");
var fs = require("fs");
var app = express();

// Server starts at 4000
app.listen(4000, () => {
 console.log("Server running on port 4000");
});

// Api for sending the all stations data
app.get("/getStations", (req, res, next) => {
  var fileData = "";
  res.setHeader('Access-Control-Allow-Origin', '*'); // Cross origin
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS') 

  // Getting the file data as string
  fs.readFile("assets/metro.txt", "utf-8", function(err, buf) {
    if(err){
      console.log("File not found",err);
      res.status(500).json(err);
    } else {
      fileData=buf.toString();
      res.status(200).json({
        textData:fileData
      });
    }
  });
 });