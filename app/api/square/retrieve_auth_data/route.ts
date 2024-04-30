import { getUser } from "@/lib/actions/user.action";
import { decodeJWT, verifyJWT } from "@/utils/server-helpers";
import { AuthStatus } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  if (!verifyJWT(req)) {
    return NextResponse.json({ status: 403 });
  }
  const id = decodeJWT(req);
  const user = await getUser(id);
  const isAuthed = user?.squareData ? true : false;
  const userDeniedSquare = user?.userDeniedSquare;
  const authStatus: AuthStatus = {
    isAuthed,
    userDeniedSquare,
  };
  return NextResponse.json({ ...authStatus }, {status: 200});
}

