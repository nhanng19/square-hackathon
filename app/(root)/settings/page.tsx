"use client"

import Task from "@/components/task";
import { OAuthComplete, OAuthSquare } from "@/components/tasks-component";
import fetchJson, { FetchError } from "@/lib/fetchson";
import { useState, useEffect } from "react";
import { AuthStatus } from "@/types";
import { toast } from "sonner";
import useSWR from "swr";

const Setting = () => {
  const [hasSquareData, setHasSquareData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useSWR<AuthStatus>("/api/square/retrieve_auth_data");
  
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

  const deauthorizeSquareuser = async () => {
    try {
      await fetchJson("/api/square/deauthorize", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      toast.success("Square user deauthorized");
    } catch (error) {
      if (error instanceof FetchError) {
        toast.error(`${error}`);
      }
    }
  };
  return (
    <>
      <h1 className="font-bold mb-4 text-3xl">Settings</h1>
      {!hasSquareData ? (
        <Task task={OAuthSquare()} />
      ) : (
        <Task task={OAuthComplete(deauthorizeSquareuser)} />
      )}
    </>
  );
};

export default Setting;
