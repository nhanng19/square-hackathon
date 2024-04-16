import { errorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { deauthorizeToken, decodeJWT, } from "@/utils/server-helpers";
import { getUser } from "@/lib/actions/user.action";

export async function POST(req : NextRequest, res : NextResponse) {
    try {
        const id = decodeJWT(req);
        const user = await getUser(id)
        const revokeOnlyAccessToken = req?.body ? true : false;
        const result = await deauthorizeToken({ user, revokeOnlyAccessToken });
        if (!revokeOnlyAccessToken) { 

        }
        return NextResponse.json(result, { status: 200 })
    } catch (error) { 
        return errorResponse(error)
    }
 }