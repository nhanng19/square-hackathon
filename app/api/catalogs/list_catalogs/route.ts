import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, decodeJWT } from "@/utils/server-helpers";
import { getUser } from "@/lib/actions/user.action";
import { isString } from "@/utils/helpers";
import { decryptToken, isTokenValid } from "@/utils/server-helpers";
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

  if (!checkToken) {
    return NextResponse.json(
      { locations: [], isTokenValid: checkToken },
      { status: 200 }
    );
  }

  const apiUrl = process.env.SQUARE_BASE_URL + "v2/catalog/list?types=item";

  const requestOptions = {
    method: "GET",
    headers: {
      "Square-Version": "2024-03-20",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    return NextResponse.json(
      { ...data, isTokenValid: checkToken },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error in API call:", e);
    return NextResponse.json(e, { status: 400 });
  }
}
