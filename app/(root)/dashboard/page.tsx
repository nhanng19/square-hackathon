"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { AuthStatus } from "@/types";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
  CardContent,
} from "@/components/ui/card";
import Task from "@/components/task";
import {
  ConnectToSquare,
  ConnectedToSquare,
  WelcomeToSquare,
} from "@/components/tasks-component";
import useUser from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const DashboardData = () => {
    return !hasSquareData ? (
      <>
        <Task task={WelcomeToSquare(user?.firstName, user?.lastName)} />
        <Task task={ConnectToSquare()} />
      </>
    ) : (
      <>
        <Task task={ConnectedToSquare()} />
        <div className="grid grid-cols-3 gap-4">
          <Card className="h-[60vh]">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <img src={"/images/i-integration.webp"} />
              <CardHeader className="flex justify-center flex-col items-center gap-2">
                <CardTitle>Step 1</CardTitle>
                <CardDescription>
                  Integrate Square Edge with your website
                </CardDescription>
                <Button asChild>
                  <Link href="/integrations">Integrate with website</Link>
                </Button>
              </CardHeader>
            </CardContent>
          </Card>
          <Card className="h-[60vh]">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <img src={"/images/i-sales.png"} />
              <CardHeader className="flex justify-center flex-col items-center gap-2">
                <CardTitle>Step 2</CardTitle>
                <CardDescription>Create a virtual sales room</CardDescription>
                <Button asChild>
                  <Link href="/rooms/add">Create room</Link>
                </Button>
              </CardHeader>
            </CardContent>
          </Card>
          <Card className="h-[60vh]">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <img src={"/images/i-recording.png"} />
              <CardHeader className="flex justify-center flex-col items-center gap-2">
                <CardTitle>Step 3</CardTitle>
                <CardDescription>View and upload demos</CardDescription>
                <Button asChild>
                  <Link href="/rooms/recordings">View recordings</Link>
                </Button>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  return (
    <>
      <h1 className="font-bold mb-4 text-3xl">Dashboard</h1>
      {isLoading ? (
        <Skeleton className="h-[100px] w-full rounded-xl" />
      ) : (
        <div className="flex flex-col gap-4">
          <DashboardData />
        </div>
      )}
    </>
  );
};

export default Dashboard;
