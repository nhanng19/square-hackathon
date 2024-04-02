
import { setCookie } from "../../../../utils/cookies";
import { createUser } from "@/lib/actions/user.action";
import { createJWT, hashPassword, errorResponse } from "@/lib/utils";
import Crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
export async function POST(req: any, res: any) {

  const { email, password, firstName, lastName } = await req.json();
  try {
    // let user = await getUserByEmail(email);
    // if (user) {
    //   return res.status(409).json({ message: "User already exists" });
    // }
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
    const token = await createJWT({ sub: newUser.id });
    const options: CookieSerializeOptions = {}
      const stringValue =
        typeof token === "object"
          ? "j:" + JSON.stringify(token)
          : String(token);

      if (typeof options.maxAge === "number") {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
      }
      options.httpOnly = true;
      options.path = "/";

    return new NextResponse("", {
      headers: {
        "Set-Cookie": serialize("token", stringValue, options),
      },
    });
  } catch (e) {
    console.error(e);
    return errorResponse(res, e);
  }
}

