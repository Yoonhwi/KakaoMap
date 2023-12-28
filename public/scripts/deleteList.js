function deleteList() {
  const elementsToRemove =
    document.body.getElementsByClassName("address_flexBox");
  for (const element of elementsToRemove) {
    element.remove();
  }
  document.body.appendChild(addressList());
}
