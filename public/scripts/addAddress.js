var element_layer = document.getElementById("layer");

function closeDaumPostcode() {
  element_layer.style.display = "none";
}

function execDaumPostcode() {
  if (introduce === "") {
    alert("주소설명란을 입력하세요.");
    return;
  }
  new daum.Postcode({
    oncomplete: function (data) {
      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("address").value = addr;

      element_layer.style.display = "none";
    },
    width: "100%",
    height: "100%",
    maxSuggestItems: 5,
  }).embed(element_layer);

  element_layer.style.display = "block";

  initLayerPosition();
}

function initLayerPosition() {
  var width = 400;
  var height = 500;
  var borderWidth = 5;

  element_layer.style.width = width + "px";
  element_layer.style.height = height + "px";
  element_layer.style.border = borderWidth + "px solid";

  element_layer.style.left =
    ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 -
    borderWidth +
    "px";
  element_layer.style.top =
    ((window.innerHeight || document.documentElement.clientHeight) - height) /
      2 -
    borderWidth +
    "px";
}
