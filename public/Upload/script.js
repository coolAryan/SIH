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
  fileName.textContent = uploadButton.files[0].name; //filename
};

var text = document.getElementById("msg");

function checkMe() {
  text.style.display = "block";
}