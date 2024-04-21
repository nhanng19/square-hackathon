import { getRoomById, getRooms } from "@/lib/actions/room.action";
import { errorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roomId = params.id;
    const rooms = await getRoomById(roomId);
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
