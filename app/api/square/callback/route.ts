import { SquareDataType } from "@/types";
import { authorizeUser, getUser, updateUser } from "@/lib/actions/user.action";
import { decodeJWT, isString } from "@/utils/helpers";
import { getOauthClient } from "@/utils/oauth-client";
import { NextRequest, NextResponse } from "next/server";

// TODO: Confirm this method handles all potential error cases gracefully
export async function GET(
  req: NextRequest,
  res: NextResponse<{ status: string } | { error: string } | Error[]>
) {
  // Verify the state to protect against cross-site request forgery.
  // When the response_type is "code", the seller clicked Allow
  // and the authorization page returned the auth tokens.

    // Extract the returned authorization code from the URL
    const response = req.nextUrl.searchParams.getAll("code");
  const code = response[0]
    try {
      // API call to ObtainToken - https://developer.squareup.com/reference/square/oauth-api/obtain-token
      if (!isString(code)) {
        throw new Error("code is not a string");
      }
      if (!isString(process.env.APP_ID)) {
        throw new Error("APP_ID is not a string");
      }
      const oAuthApi = getOauthClient();
      const { result } = await oAuthApi.obtainToken({
        // Provide the code in a request to the Obtain Token endpoint
        code: code,
        clientId: process.env.APP_ID,
        grantType: "authorization_code",
        codeVerifier: req.cookies.get("square-code-verifier")?.value,
      });

      // Extract the returned access token from the ObtainTokenResponse object
      const { accessToken, refreshToken, expiresAt, merchantId } = result;

      // Prepare the data to be written to the database
      // NOTE: We will encrypt the access and refresh tokens before storing it.
      const squareData: SquareDataType = {
        tokens: JSON.stringify({
          accessToken,
          refreshToken,
        }),
        expiresAt,
        merchantId,
      };
      // grab the user id from the JWT
      const id = await decodeJWT(req);
      // update user object to reflect that they have authorized Square
      const user = await getUser(id);
      if (user?.userDeniedSquare) {
        await updateUser({
          id,
          user: {
            ...user,
            userDeniedSquare: false,
          },
        });
      }
      // Update the database with the authorized Square data
      await authorizeUser({
        id,
        squareData,
      });

         req.nextUrl.pathname = "/dashboard";
         return NextResponse.redirect(req.nextUrl);
    } catch (error) {
      // The response from the Obtain Token endpoint did not include an access token. Something went wrong.
      console.log("failed to get token", error);
    }

}
