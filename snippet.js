let previousWindow = null;

const decodeRoomId = (roomId) => {
  let decodedString = "";
  for (let i = 0; i < roomId.length; i += 2) {
    decodedString += String.fromCharCode(parseInt(roomId.substr(i, 2), 16));
  }
  return decodedString;
};

const createLiveBadge = () => {
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
  return badge;
};

const openLiveStream = (productId) => {
  if (previousWindow && !previousWindow.closed) {
    previousWindow.close();
  }
  const newWindowFeatures = "width=500,height=1000,left=100,top=100";
  previousWindow = window.open(
    `http://localhost:3000/video/${productId}`,
    "_blank",
    newWindowFeatures
  );
};

const addLiveBadgeToParagraph = (p, productId) => {
  const badge = createLiveBadge();
  badge.addEventListener("click", (e) => {
    e.preventDefault();
    openLiveStream(productId);
  });
  p.insertAdjacentElement("afterend", badge);
};

setTimeout(async () => {
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
      addLiveBadgeToParagraph(p, productId);
    }
  });
}, 2000);
