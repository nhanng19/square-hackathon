"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { SCOPES } from "@/constants";
import Logo from "./svg/logo";
import { Loader2 } from "lucide-react";
import LoadingScreen from "./loading-screen";

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
    <LoadingScreen title={"Connecting you to square."} subtitle={"Just one moment..."} />
  );
};

export default OAuthLoadingScreen;
