import { NextRequest } from "next/server";
import { InternalServerError, NextApiUserRequest } from "../types";
import { verify } from "../middleware";
import { decodeJwt } from "jose";
import crypto, { pbkdf2Sync } from "crypto";
// validate the users JWT
export const verifyJWT = async (req: NextRequest): Promise<boolean> => {
  if (!isString(process.env.JWT_SIGNING_SECRET)) {
    console.error("JWT_SIGNING_SECRET is not set - check .env file");
    throw new InternalServerError("Server Error", 500);
  }
  const cookieHeader = req?.headers.get("cookie");
  const token = cookieHeader?.split("=")[1];

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

export const decryptToken = function (tokens: string, iv: string): Tokens {
  if (!process.env.REACT_AES_KEY) {
    console.error("REACT_AES_KEY is not set - check .env file");
    throw new InternalServerError("Internal Server Error", 500);
  }
  const algorithm = "aes-256-cbc";
  const key: crypto.CipherKey = process.env.REACT_AES_KEY;
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(tokens, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};

/**
 * Helper function to format money into appropriate currency and rounding.
 * If the value is an integer (i.e. no decimal places), do not show `.00`.
 * @param {Number} value the amount
 * @param {String} currency the currency code
 */
export const formatMoney = function (value: bigint, currency: string) {
  let valueAsNumber = Number(value);
  // Create number formatter.
  const props = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  };
  // If the value is an integer, show no decimal digits.
  if (valueAsNumber % 1 == 0) {
    props.minimumFractionDigits = 0;
  }

  // Some currencies don't need to use higher denominations to represent values.
  if (currency !== "JPY") {
    valueAsNumber /= 100.0;
  }
  const formatter = new Intl.NumberFormat("en-US", props);
  return formatter.format(valueAsNumber);
};

export function validateFormInput<T>(data: Record<string, T>): string[] {
  const missingData: string[] = [];

  for (const key in data) {
    if (!data[key]) {
      missingData.push(key);
    }
  }

  return missingData;
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}
