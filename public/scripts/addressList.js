function onClickListHandler({ x, y }) {
  try {
    const moveLatLon = new kakao.maps.LatLng(y, x);
    map.setLevel(3);
    map.panTo(moveLatLon);
  } catch (err) {
    console.log(err);
  }
}

function addressList() {
  const markerImageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);
  const localStorageData = Object.entries(localStorage);
  const parentElement = document.createElement("div");
  parentElement.classList.add("address_flexBox");
  localStorageData.forEach((addressData) => {
    const parseData = JSON.parse(addressData[1]);
    const latlng = new kakao.maps.LatLng(
      parseData.latLng.y,
      parseData.latLng.x
    );
    const marker = new kakao.maps.Marker({
      map: map,
      position: latlng,
      title: parseData.introduce,
      image: markerImage,
    });
    kakao.maps.event.addListener(marker, "click", function () {
      onClickListHandler(parseData.latLng);
    });

    const addressDiv = document.createElement("div");
    addressDiv.addEventListener("click", () => {
      onClickListHandler(parseData.latLng);
    });
    addressDiv.classList.add("address_child");
    addressDiv.innerHTML = `
      <div>주소설명:${parseData.introduce}</div>
      <div>우편번호:${parseData.postcode}</div>
      <div>주소:${parseData.address}</div>
    `;
    parentElement.appendChild(addressDiv);
  });
  return parentElement;
}
