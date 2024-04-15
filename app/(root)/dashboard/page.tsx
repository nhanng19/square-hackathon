"use client";

import { Button } from "@/components/ui/button";
import { SCOPES } from "@/constants";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AuthStatus } from "@/types";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
const Dashboard = () => {

  const [hasSquareData, setHasSquareData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useSWR<AuthStatus>("/api/square/retrieve_auth_data");
  const { data: authUrl, error: authUrlError } = useSWR("/api/square/auth_url")


  useEffect(() => {
    if (data?.isAuthed) {
      setIsLoading(false);
      setHasSquareData(data.isAuthed);
    } else {
      setIsLoading(false);
      setHasSquareData(false);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleConnectSquare = () => {
    const {
      squareCodeVerifier,
      squareState,
      baseURl,
      appId,
      squareCodeChallenge,
    } = authUrl;
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
    <>
      {hasSquareData ? (
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Connected to Square</CardTitle>
            <CardDescription>
              Your Account has been successfully connected to Square.
            </CardDescription>
          </CardHeader>
   
          {/* <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter> */}
        </Card>
      ) : (
        <Button variant="default" onClick={handleConnectSquare}>
          Connect Square
        </Button>
      )}
    </>
  );
};

export default Dashboard;
