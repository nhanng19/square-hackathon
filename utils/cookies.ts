import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  token: string,
  options: CookieSerializeOptions = {}
) => {
    const stringValue =
      typeof token === "object" ? "j:" + JSON.stringify(token) : String(token);

    if (typeof options.maxAge === "number") {
      options.expires = new Date(Date.now() + options.maxAge * 1000);
    }
    options.httpOnly = true;
  options.path = "/";
  return serialize("token", stringValue, options);
};
