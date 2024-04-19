import { deleteRoom } from "@/lib/actions/room.action";
import { errorResponse } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req : NextRequest, { params }: { params: { id: string } }) {
    try {
    const roomId = params.id;
    const response = await deleteRoom(roomId);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
