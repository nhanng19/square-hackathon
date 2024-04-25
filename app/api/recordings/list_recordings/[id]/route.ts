import { getRecordings } from "@/lib/actions/recording.action";
import { errorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const userId = params.id;
    try { 
        const recordings = await getRecordings(userId);
        return NextResponse.json(recordings, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
    } catch (error) { 
        return errorResponse(error)
    }
}