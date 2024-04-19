import { verifyJWT, decodeJWT} from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/actions/user.action";
import { errorResponse } from "@/lib/utils";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const isValidToken = await verifyJWT(req);
    if (isValidToken) {
        const user = await getUser(decodeJWT(req));
      return NextResponse.json(
        {
          userId: user?._id,
          username: user?.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          avatar: user?.avatar,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        userId: "",
        username: "",
        firstName: "",
        lastName: "",
        avatar: "",
      });
    }
    } catch (error: any) { 
      return errorResponse(error)
    }
}
