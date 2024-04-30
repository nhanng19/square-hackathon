import { getUser } from "@/lib/actions/user.action";
import { decodeJWT, isString, verifyJWT } from "@/utils/helpers";
import { getOauthClient } from "@/utils/square-client";
import { decryptToken } from "@/utils/server-helpers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// This endpoint solely exists to the Frontend can check if the user's token is still valid
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (!verifyJWT(req)) {
      return NextResponse.json(
        { error: "User has invalid JWT" },
        { status: 403 }
      );
    }
    const id = decodeJWT(req);
    const user = await getUser(id);
    if (!isString(user?.squareData?.tokens) || !isString(user?.metaData?.iv)) {
      return NextResponse.json({ isValid: false }, { status: 200 });
    }

    const { accessToken } = decryptToken(
      user?.squareData?.tokens,
      user?.metaData?.iv
    );

    const oAuthApi = getOauthClient();

    // If this request fails, with 401, we know the token is invalid, and either expired or been revoked
    const { result } = await oAuthApi.retrieveTokenStatus(
      `Bearer ${accessToken}`
    );
    if (result.merchantId) {
      return NextResponse.json({ isValid: true }, { status: 200 });
    } else {
      return NextResponse.json({ isValid: false }, { status: 200 });
    }
  } catch (e: any) {
    if (e.statusCode === 401) {
      return NextResponse.json({ isValid: false }, { status: 200 });
    } else {
      console.error("error: ", e);
      return NextResponse.json({ isValid: false }, { status: 200 });
    }
  }
}

