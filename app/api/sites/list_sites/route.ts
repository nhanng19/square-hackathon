import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, decodeJWT } from "@/utils/server-helpers";
import { getUser } from "@/lib/actions/user.action";
import { isString } from "@/utils/helpers";
import { decryptToken } from "@/utils/server-helpers";
export async function GET(req: NextRequest, res: NextResponse) {
    if (!verifyJWT(req)) {
        return NextResponse.json({status: 403})
    }
    const id = decodeJWT(req);
    const user = await getUser(id);
        if (
          !isString(user?.squareData?.tokens) ||
          !isString(user?.metaData?.iv)
        ) {
          return NextResponse
            .json({
              locations: [],
              isTokenValid: false,
              error: "squareData or metaData is not a string",
            }, {status: 500});
        }
            const { accessToken } = decryptToken(
              user?.squareData?.tokens,
              user?.metaData?.iv
            );
  // if (!verifyJWT(req)) {
  //   return res.status(403);
  //
  return new NextResponse("hello");
}
