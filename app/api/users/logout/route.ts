import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  cookies().delete("token");
  redirect("/");
}
