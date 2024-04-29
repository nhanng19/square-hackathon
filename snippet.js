<script src="https://cdn.tailwindcss.com"></script>;

let previousWindow = null;

const userId = "6629c9f7ab7170b2f9fd979f";

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
  badge.className =
    "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-red-400";
  return badge;
};

const createRecordingBadge = () => {
  const badge = document.createElement("button");
  badge.textContent = "DEMO";
  badge.className =
    "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400";
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

const addRecordingBadgeToParagraph = (p, productId) => {
  const badge = createRecordingBadge();
  badge.addEventListener("click", (e) => {
    e.preventDefault();
    openLiveStream(productId);
  });
  p.insertAdjacentElement("afterend", badge);
};

const fetchRecordings = async () => {
  const response = await fetch(
    `http://localhost:3000/api/recordings/list_recordings/${userId}`
  );
  const recordings = await response.json();
  return recordings;
};

setTimeout(async () => {
  const response = await fetch(
    `http://localhost:3000/api/rooms/list_rooms/${userId}`
  );
  const items = await response.json();
  const recordings = await fetchRecordings();
  document.querySelectorAll("p").forEach((p) => {
    const itemText = p.textContent.trim();
    const matchingItem = items.find((item) =>
      itemText.includes(decodeRoomId(item?.roomId))
    );
    const matchingRecording = recordings.find((recording) =>
      itemText.includes(decodeRoomId(recording?.roomId))
    );
    if (matchingItem) {
      const productId = matchingItem?.roomId;
      addLiveBadgeToParagraph(p, productId);
    }
    if (matchingRecording) {
      const productId = matchingRecording?.roomId;
      addRecordingBadgeToParagraph(p, productId);
    }
  });
}, 2000);
