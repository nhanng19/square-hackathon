import { setCookie } from "../../../../utils/cookies";
import { createUser } from "@/lib/actions/user.action";
import { createJWT, hashPassword, errorResponse } from "@/lib/utils";
import Crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/actions/user.action";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, firstName, lastName } = await req.json();
  try {
    let user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    const { hash, salt } = await hashPassword(password);
    const newUser = await createUser({
      email,
      password: hash,
      firstName,
      lastName,
      salt,
      avatar: Crypto.createHash("md5").update(email).digest("hex"),
    });
    // create a jwt token that is valid for 7 days
    const token = await createJWT({ sub: newUser._id.toString() });
    return NextResponse.json(
      {
        id: newUser._id,
        email: newUser.email,
        token,
      },
      {
        headers: {
          "Set-Cookie": setCookie(token),
        },
      }
    );
  } catch (e) {
    console.error(e);
    return errorResponse(e);
  }
}
