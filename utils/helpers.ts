import { InternalServerError } from "@/types";
import { decodeJwt } from "jose";
import { NextRequest } from "next/server";
import { verify } from "../middleware";
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export const verifyJWT = async (req: NextRequest): Promise<boolean> => {
  if (!isString(process.env.JWT_SIGNING_SECRET)) {
    console.error("JWT_SIGNING_SECRET is not set - check .env file");
    throw new InternalServerError("Server Error", 500);
  }
  const token = req?.cookies?.get("token")?.value;
  if (token == undefined) return false;
  try {
    await verify(token, process.env.JWT_SIGNING_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};

// Read the user's id from the JWT
export const decodeJWT = (req: NextRequest): string | undefined => {
  try {
    const token = req?.cookies.get("token");
    if (token === undefined) return "";

    const jwt = decodeJwt(token.value);
    return jwt.sub;
  } catch (e) {
    console.error(e);
    throw new InternalServerError("could not decode JWT", 500);
  }
};

export const encodeRoomId = (roomId: string): string => { 
  var encodedString = "";
  for (var i = 0; i < roomId.length; i++) encodedString += roomId.charCodeAt(i).toString(16);
  encodedString = encodedString.substr(0, 64);
  return encodedString;
} 

export const decodeRoomId = (roomId: string): string => {
    var decodedString = "";
    for (var i = 0; i < roomId.length; i += 2) {
      decodedString += String.fromCharCode(
        parseInt(roomId.substr(i, 2), 16)
      );
    }
    return decodedString;
}; 

export function formatDate(inputDateStr : string) {
  // Parse the input date string into a Date object
  const date = new Date(inputDateStr);

  // Extract the month, day, and year from the Date object
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = date.getDate();
  const year = date.getFullYear() % 100; // Extracting last two digits of the year

  // Format the date components into mm/dd/yy format
  const formattedDate = `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year.toString().padStart(2, "0")}`;

  return formattedDate;
}

export function calculateDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInMillis = end.getTime() - start.getTime();

  // Convert duration from milliseconds to seconds, minutes, hours, etc.
  const seconds = Math.floor((durationInMillis / 1000) % 60);
  const minutes = Math.floor((durationInMillis / (1000 * 60)) % 60);
  const hours = Math.floor((durationInMillis / (1000 * 60 * 60)) % 24);
  const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24));

  // Construct the duration string
  let durationString = "";
  if (days > 0) durationString += `${days} day.`;
  if (hours > 0) durationString += `${hours} hr.`;
  if (minutes > 0) durationString += `${minutes} min. `;
  if (seconds > 0) durationString += `${seconds} sec.`;

  return durationString.trim();
}


export async function generateThumbnail(videoUrl : string) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;

    video.onloadedmetadata = function () {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to base64 encoded image
      const thumbnail = canvas.toDataURL("image/jpeg");
      console.log(thumbnail)
      // Resolve the promise with the thumbnail data
      resolve(thumbnail);
    };

    video.onerror = function (err) {
      console.error("Error loading video:", err);
      // Reject the promise if there's an error
      reject(err);
    };

    // Start loading the video
    video.load();
  });
}
