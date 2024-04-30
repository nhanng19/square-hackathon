"use server";

import { cookies } from "next/headers";

const useCookies = async () => {
  const cookieStore = cookies();
  const tokenId = cookieStore.get("token");
  return tokenId;
};

export default useCookies;
