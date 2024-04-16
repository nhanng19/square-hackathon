"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { SCOPES } from "@/constants";
import Logo from "./svg/logo";
import { Loader2 } from "lucide-react";

const OAuthLoadingScreen = ({ url }: { url: string }) => {
  const {
    data: {
      squareCodeChallenge,
      squareCodeVerifier,
      squareState,
      baseURl,
      appId,
    } = {
      squareCodeChallenge: null,
      squareCodeVerifier: null,
      squareState: null,
      baseURl: null,
      appId: null,
    },
    isValidating,
  } = useSWR(url);
  useEffect(() => {
    if (!isValidating) {
      document.cookie = `square-code-verifier=${squareCodeVerifier}`;
      document.cookie = `square-state=${squareState}`;
      window.location.assign(
        `${baseURl}oauth2/authorize?client_id=${appId}&session=false&scope=${SCOPES.join(
          "+"
        )}&state=${squareState}&code_challenge=${squareCodeChallenge}`
      );
    }
  });
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <div className="flex flex-col items-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-light">Connecting you to Square</h1>
        <span className="font-normal mb-4">Just one moment...</span>
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default OAuthLoadingScreen;
