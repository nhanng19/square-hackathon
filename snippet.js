let previousWindow = null;

setTimeout(async function () {
  const response = await fetch(
    "http://localhost:3000/api/rooms/list_rooms/661cd233a9d7ec9afda8a8a0"
  );
  const items = await response.json();

  document.querySelectorAll("p").forEach((p) => {
    const itemText = p.textContent.trim();
    const matchingItem = items.find((item) =>
      itemText.includes(decodeRoomId(item?.roomId))
    );
    if (matchingItem) {
      const productId = matchingItem?.roomId;
      const badge = document.createElement("button");
      badge.textContent = "LIVE";
      badge.style.backgroundColor = "red";
      badge.style.color = "white";
      badge.style.padding = "4px 8px";
      badge.style.borderRadius = "5px";
      badge.style.marginLeft = "5px";
      badge.style.textDecoration = "none";
      badge.style.zIndex = "99";
      badge.style.border = "none";
      badge.style.cursor = "pointer";
      badge.addEventListener("click", function (e) {
        e.preventDefault();
        if (previousWindow && !previousWindow.closed) {
          previousWindow.close();
        }
        const newWindowFeatures = "width=500,height=1000,left=100,top=100";
        previousWindow = window.open(
          `http://localhost:3000/video/${productId}`,
          "_blank",
          newWindowFeatures
        );
      });
      p.insertAdjacentElement("afterend", badge);
    }
  });
}, 2000);

const decodeRoomId = (roomId) => {
  var decodedString = "";
  for (var i = 0; i < roomId.length; i += 2) {
    decodedString += String.fromCharCode(parseInt(roomId.substr(i, 2), 16));
  }
  return decodedString;
};
