import { createRecording } from "@/lib/actions/recording.action";
import { errorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await createRecording
    } catch (error) { 
        return errorResponse(error);
    }
}