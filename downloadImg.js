var AWS = require("aws-sdk");
var path = require("path");
var fs = require("fs");

// Set the region
AWS.config.update({ region: "ap-south-1" });
// Create S3 service object
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });


function downloadImg() {
   var params = {
     Bucket: "sih-project-vss",
     Key: path.basename("target.jpeg"),
   };
   let readStream = s3.getObject(params).createReadStream();
   let writeStream = fs.createWriteStream("./public/target.jpg");
   readStream.pipe(writeStream);

}

downloadImg();

module.exports = downloadImg;
