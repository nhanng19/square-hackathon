import { getRooms } from "@/lib/actions/room.action";
import { errorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { id: string } } ) {
  try {
    const userId = params.id
    const rooms = await getRooms(userId);
    return NextResponse.json(rooms, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
