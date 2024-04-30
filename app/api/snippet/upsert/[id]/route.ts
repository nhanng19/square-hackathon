import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, decodeJWT } from "@/utils/server-helpers";
import { getUser } from "@/lib/actions/user.action";
import { isString } from "@/utils/helpers";
import { decryptToken, isTokenValid } from "@/utils/server-helpers";
import { getUserClient } from "@/utils/square-client";
import { errorResponse } from "@/lib/utils";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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
  const { snippetsApi } = getUserClient(accessToken);
  try {
    const siteId = params.id;
    const { content } = await req.json();
    const { result } = await snippetsApi.upsertSnippet(
      siteId,
      {
        snippet: {
          content
        },
      }
    );
    return NextResponse.json({...result}, { status: 200 })
  } catch (error) {
    return NextResponse.json(error)
  }
}
