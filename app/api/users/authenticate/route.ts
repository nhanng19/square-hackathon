import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/actions/user.action";
import { createJWT, isPasswordCorrect, errorResponse } from "@/lib/utils";
import { setCookie } from "@/utils/cookies";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    const user = await getUserByEmail(email);
    if (!isPasswordCorrect(user?.password || "", user?.salt || "", password)) {
      return NextResponse.json(
        { message: "Username or password is incorrect" },
        { status: 404 }
      );
    }
    const token = await createJWT({ sub: user?._id.toString() });
    return NextResponse.json("", {
      headers: {
        "Set-Cookie": setCookie(token),
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
