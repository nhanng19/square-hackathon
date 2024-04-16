"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { AuthStatus } from "@/types";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@/components/ui/card";
import Task from "@/components/task";
import {
  ConnectToSquare,
  ConnectedToSquare,
  WelcomeToSquare,
} from "@/components/tasks-component";
import useUser from "@/hooks/useUser";

const Dashboard = () => {
  const [hasSquareData, setHasSquareData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useSWR<AuthStatus>("/api/square/retrieve_auth_data");
  const { user } = useUser();
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

  return (
    <>
      <h1 className="font-bold mb-4 text-3xl">Dashboard</h1>
      {hasSquareData ? (
        <Task task={ConnectedToSquare()} />
      ) : (
        <div className="flex flex-col gap-4">
          <Task task={WelcomeToSquare(user?.firstName, user?.lastName)} />
          <Task task={ConnectToSquare()} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
