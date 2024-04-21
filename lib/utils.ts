import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto, { pbkdf2Sync } from "crypto";
import { SignJWT } from "jose";
import {
  AppError,
  BadRequestError,
  DatabaseError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../types";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createJWT = async (payload: { sub?: string }) => {
  try {
    if (!process.env.JWT_SIGNING_SECRET) {
      console.error("JWT_SIGNING_SECRET is not set - check .env file");
      throw new InternalServerError("Server Error", 500);
    }
    const secret = process.env.JWT_SIGNING_SECRET || "";
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7; // 7 days
    return await new SignJWT({ ...payload })
      .setProtectedHeader({
      alg: "HS256",
        typ: "JWT",
      })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(secret));
  } catch (e) {
    console.error("error: ", e);
    throw new InternalServerError("Error creating JWT", 500);
  }
};

export const hashPassword = async (password: string) => {
  try {
    const salt = crypto.randomBytes(128).toString("base64");
    const iterations = 10000;
    const hash = await pbkdf2Sync(password, salt, iterations, 64, "sha512");
    return {
      salt: salt,
      hash: hash.toString("hex"),
      iterations: iterations,
    };
  } catch (e) {
    console.error("error: ", e);
    throw new InternalServerError("Error hashing password", 500);
  }
};

export const isPasswordCorrect = (
  savedHash: string,
  savedSalt: string,
  passwordAttempt: string
) => {
  return (
    savedHash ==
    pbkdf2Sync(passwordAttempt, savedSalt, 10000, 64, "sha512").toString("hex")
  );
};

export const getAuthUrlValues = () => {
  const base64Encode = (str: Buffer) => {
    return str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  const codeVerifier = base64Encode(crypto.randomBytes(32));

  const sha256 = (buffer: string) => {
    return crypto.createHash("sha256").update(buffer).digest();
  };
  const codeChallenge = base64Encode(sha256(codeVerifier));

  const state = base64Encode(crypto.randomBytes(12));

  const squareCodeVerifier = codeVerifier;
  const squareState = state;
  return {
    squareCodeChallenge: codeChallenge,
    squareCodeVerifier,
    squareState,
    baseURl: process.env.SQUARE_BASE_URL!,
    appId: process.env.APP_ID!,
  };
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

export const errorResponse = ( err: any) => {
  switch (true) {
    case err instanceof BadRequestError:
      return NextResponse.json({ message: err.message });
    case err instanceof UnauthorizedError:
      return NextResponse.json({ message: err.message });
    case err instanceof ForbiddenError:
      return NextResponse.json({ message: err.message });
    case err instanceof NotFoundError:
      return NextResponse.json({ message: err.message });
    case err instanceof DatabaseError:
      return NextResponse.json({ message: err.message });
    case err instanceof InternalServerError:
      return NextResponse.json({ message: err.message });
    default:
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
  }
};
