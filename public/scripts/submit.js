const getLatLngFromAddress = async (address) => {
  return new Promise((resolve, reject) => {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      console.log("status", status);
      console.log("services status", kakao.maps.services.Status.OK);
      if (status === kakao.maps.services.Status.OK) {
        const latLng = {
          x: result[0].road_address.x,
          y: result[0].road_address.y,
        };
        resolve(latLng);
      } else {
        reject(new Error("Geocoding failed"));
      }
    });
  });
};

const submitForm = async () => {
  // Get the values from the form
  const introduce = document.getElementById("introduce").value;
  const postcode = document.getElementById("postcode").value;
  const address = document.getElementById("address").value;
  const latLng = await getLatLngFromAddress(address);
  console.log(latLng);
  if (introduce === "" || postcode === "" || address === "") {
    alert("양식에 맞게 입력해주세요.");
    return false;
  }

  const params = JSON.stringify({ introduce, postcode, address, latLng });

  window.localStorage.setItem(window.localStorage.length, params);

  console.log("주소설명:", introduce);
  console.log("우편번호:", postcode);
  console.log("주소:", address);
  console.log("좌표:", latLng);

  console.log(params);
  // 데이터 전달후 초기화
  document.getElementById("introduce").value = "";
  document.getElementById("postcode").value = "";
  document.getElementById("address").value = "";
  deleteList();
  return false;
};
