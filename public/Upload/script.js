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

function checkMe() {
  text.style.display = "block";
  console.log("Button Clicked");
  // uploadFunc();
}

// async function uploadFile() {
//   console.log("1");
//   let reader = new FileReader();
//   reader.readAsDataURL(uploadButton.files[0]);
//   console.log(reader, "1");
//   reader.onload = () => {
//     chosenImage.setAttribute("src", reader.result);
//   };
//   fileName.textContent = uploadButton.files[0].name;
//   var filename = fileName.textContent;

//   upload();

//   await axios({
//     method: "post",
//     url: "http://localhost:3000/upload",
//     data: filename,
//     headers: {
//       "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
//     },
//   }).then(() => {
//     console.log("Filename Transfer");
//   });
// }

// function closePopup()
// {
// 	popup.classList.remove("open-popup");
// }
