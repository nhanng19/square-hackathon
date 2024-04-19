import { getRooms } from "@/lib/actions/room.action";
import { errorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId }: { userId: string } = await req.json();
    const rooms = await getRooms(userId);
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
