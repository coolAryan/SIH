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
    Key: path.basename("target.jpg"),
  };
  let readStream = s3.getObject(params).createReadStream();
  let writeStream = fs.createWriteStream("./public/target.jpg");
  readStream.pipe(writeStream);
}

function allImages(){
 var bucketParams = {
  Bucket : 'sih-project-vss',
 };

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
    let number = data["Contents"].length;
    for (let i = 0; i < number; i++) {
      var params = {
        Bucket: "sih-project-vss",
        Key: path.basename(data["Contents"][i].Key),
      };
      let readStream = s3.getObject(params).createReadStream();
      let writeStream = fs.createWriteStream(
        path.join(__dirname, data["Contents"][i].Key)
      );
      readStream.pipe(writeStream);
    }
  }
  console.log(number);
});
}


module.exports = { 
    downloadImg, 
    allImages
};
