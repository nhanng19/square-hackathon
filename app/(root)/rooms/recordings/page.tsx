"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUser from "@/hooks/useUser";
import { calculateDuration, decodeRoomId, formatDate } from "@/utils/helpers";
import useSWR, { mutate } from "swr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, MoreHorizontal, Upload, Trash } from "lucide-react";
import { deleteRecording } from "@/lib/actions/recording.action";
import { toast } from "sonner";
const Page = () => {
  const { user } = useUser();
  const { data: recordings } = useSWR(
    `/api/recordings/list_recordings/${user?.userId}`
  );

  const handleDeleteRecording = async (recordingId: string) => {
    try {
      const response = await deleteRecording(recordingId);
      mutate(`/api/recordings/list_recordings/${user?.userId}`);
      toast.success(`Recording successfully deleted!`);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <h1 className="font-bold mb-4 text-3xl">Recordings</h1>
      <Card>
        <CardHeader>
          <CardTitle>View your past recordings</CardTitle>
          <CardDescription>
            Select one of your products to start a live, virtual sales room.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 h-full w-full gap-4 ">
            {recordings?.length > 0 &&
              recordings.map((recording: any) => {
                return (
                  <Card key={recording._id} className="p-0">
                    <CardContent className="p-0">
                      <video controls className="w-full rounded-t-lg">
                        <source src={recording.url} type="video/mp4" />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="max-w-[80%] truncate ...">
                        {decodeRoomId(recording.roomId)}
                      </CardTitle>
                      <CardDescription className="w-full flex items-center justify-between">
                        <span>
                          {formatDate(recording.startTime)} •{" "}
                          {calculateDuration(
                            recording.startTime,
                            recording.endTime
                          )}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteRecording(recording._id)
                              }
                              className="cursor-pointer !text-red-600 !focus:text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
