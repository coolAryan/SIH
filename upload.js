var AWS = require("aws-sdk");
var fs = require("fs");
var path = require("path");

function upload(fileName, files) {
  // let uploadButton = document.getElementById("upload-button");
  // let chosenImage = document.getElementById("chosen-image");
  // let fileName = document.getElementById("file-name");

  console.log("fileName Uplaod func", fileName);
  // console.log("fileName Uplaod func", files);

  // Set the region
  AWS.config.update({ region: "ap-south-1" });

  // Create S3 service object
  var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  // Configure the file stream and obtain the upload parameters
  var fileStream = fs.createReadStream(fileName);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: "sih-project-vss",
    Key: path.basename(fileName),
    Body: fileStream,
  };

  // uploadParams.Body = fileStream;
  // uploadParams.Key = path.basename(file);
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

module.exports = upload;
