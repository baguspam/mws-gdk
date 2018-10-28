function myCopy(x) {
  var copyText = document.getElementById(x);
  copyText.select();
  document.execCommand("copy");
  alert("Copied the text to Clipboard");
}