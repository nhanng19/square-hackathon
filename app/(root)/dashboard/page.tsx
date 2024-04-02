"use client";

import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { SCOPES } from "@/constants";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [authUrl, setAuthUrl] = useState<any>();
  const handleAuthUrl = async () => {
    const response = await fetch("http://localhost:3000/api/square/auth_url");
    const data = await response.json();
    setAuthUrl(data);
  };
  useEffect(() => {
    handleAuthUrl();
  }, []);

  const handleConnectSquare = () => {
    const { squareCodeVerifier, squareState, baseURl, appId, squareCodeChallenge } = authUrl;
    if (authUrl) {
      document.cookie = `square-code-verifier=${squareCodeVerifier}`;
      document.cookie = `square-state=${squareState}`;
      window.location.assign(
        `${baseURl}oauth2/authorize?client_id=${appId}&session=false&scope=${SCOPES.join(
          "+"
        )}&state=${squareState}&code_challenge=${squareCodeChallenge}`
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Button variant="default" onClick={handleConnectSquare}>
        Connect Square
      </Button>
    </div>
  );
};

export default Dashboard;
