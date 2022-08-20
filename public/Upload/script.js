let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
// var aws = require("aws-sdk");

uploadButton.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadButton.files[0]);
  console.log(reader, "1");
  reader.onload = () => {
    chosenImage.setAttribute("src", reader.result);
  };
  fileName.textContent = uploadButton.files[0].name;
};

// function checkMe()
// {
// 	var cb = document.getElementById("abc");
// 	var text = document.getElementById("msg");
// 	if(cb. == true)
// 	{
// 		text.style.display = "block";
// 	}
// 	else
// 	{
// 		text.style.display = "none";
// 	}
// }

// var cb = document.getElementById("abc");
var text = document.getElementById("msg");

function uploadFunc() {
  // text.style.display = "block";
  console.log("Uplaod Button Clicked");
  aws.config.update({ region: "REGION" });

  // Create S3 service object
  s3 = new aws.S3({ apiVersion: "2006-03-01" });

  // Create the parameters for calling createBucket
  var bucketParams = {
    Bucket: "test",
  };

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = { Bucket: process.argv[2], Key: "", Body: "" };
  var file = process.argv[3];

  // Configure the file stream and obtain the upload parameters
  var fs = require("fs");
  var fileStream = fs.createReadStream(file);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  var path = require("path");
  uploadParams.Key = path.basename(file);

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

function checkMe() {
  text.style.display = "block";
  console.log("Button Clicked");
  uploadFunc();
}

// function closePopup()
// {
// 	popup.classList.remove("open-popup");
// }
