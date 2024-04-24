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