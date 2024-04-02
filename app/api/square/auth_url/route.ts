import { NextApiRequest, NextApiResponse } from "next";
import { getAuthUrlValues } from "@/lib/utils";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
      const data = await getAuthUrlValues();
      return NextResponse.json(data);
    } catch (e) {
      console.error("error: ", e);
      res.status(400).json({ message: "Error getting auth url" });
    }
}
