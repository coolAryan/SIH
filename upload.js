var AWS = require("aws-sdk");
var fs = require("fs");
var path = require("path");

// Set the region
AWS.config.update({ region: "ap-south-1" });
// Create S3 service object
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

function uploadFunc(imgPath) {
  // Configure the file stream and obtain the upload parameters
  //var fileStream = fs.createReadStream("source.jpg");
  var fileStream = fs.createReadStream("./public/source.jpg");
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: "sih-project-vss",
    Key: path.basename("source.jpg"),
    Body: fileStream,
  };
  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

module.exports = uploadFunc;
