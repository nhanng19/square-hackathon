
import { errorResponse, getAuthUrlValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const data = await getAuthUrlValues();
      return NextResponse.json(data);
    } catch (e) {
      return errorResponse(e)
    }
}
