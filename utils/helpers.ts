import { InternalServerError } from "@/types";
import { decodeJwt } from "jose";
import { NextRequest } from "next/server";

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Read the user's id from the JWT
export const decodeJWT = (req: NextRequest): string | undefined => {
  try {
    const cookieHeader = req?.headers.get("cookie");
    const token = cookieHeader?.split("=")[1];
    if (token === undefined) return "";
    const jwt = decodeJwt(token);
    return jwt.sub;
  } catch (e) {
    console.error(e);
    throw new InternalServerError("could not decode JWT", 500);
  }
};