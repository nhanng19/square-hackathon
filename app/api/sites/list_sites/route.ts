import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, decodeJWT } from "@/utils/server-helpers";
import { getUser } from "@/lib/actions/user.action";
import { isString } from "@/utils/helpers";
import { decryptToken, isTokenValid } from "@/utils/server-helpers";
import { getUserClient } from "@/utils/square-client";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  if (!verifyJWT(req)) {
    return NextResponse.json({ status: 403 });
  }
  const id = decodeJWT(req);
  const user = await getUser(id);
  if (!isString(user?.squareData?.tokens) || !isString(user?.metaData?.iv)) {
    return NextResponse.json(
      {
        locations: [],
        isTokenValid: false,
        error: "squareData or metaData is not a string",
      },
      { status: 500 }
    );
  }
  const { accessToken } = decryptToken(
    user?.squareData?.tokens,
    user?.metaData?.iv
  );
  const checkToken = await isTokenValid(accessToken);
  // if (!checkToken) {
  //   return NextResponse.json(
  //     { locations: [], isTokenValid: checkToken },
  //     { status: 200 }
  //   );
  // }
  const { sitesApi } = getUserClient(accessToken);
  try {
    const { result } = await sitesApi.listSites()
    return NextResponse.json(
      { ...result, isTokenValid: checkToken },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}
