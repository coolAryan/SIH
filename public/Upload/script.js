let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");

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

function checkMe() {
  text.style.display = "block";
}

// function closePopup()
// {
// 	popup.classList.remove("open-popup");
// }
