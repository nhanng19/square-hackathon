import { CallRecording, CallRecordingList, IconButton } from "@stream-io/video-react-sdk";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowUpDown, Download, MoreHorizontal } from "lucide-react";
import { calculateDuration, decodeRoomId, generateThumbnail } from "@/utils/helpers";
import { Upload } from "lucide-react";
import {
  RecordingProps,
  createRecording,
} from "@/lib/actions/recording.action";
import { toast } from "sonner";

const RecordingStream = ({
  userId,
  roomId,
  recordings,
  onClose,
}: {
  recordings: CallRecording[] | undefined;
  userId: string | undefined;
  roomId: string;
  onClose: () => void;
}) => {
  const handleUploadRecording = async ({
    userId,
    roomId,
    fileName,
    startTime,
    endTime,
    url,
  }: RecordingProps) => {
    try {
      const thumbnail = await generateThumbnail(url);
    const response = await createRecording({
      userId,
      roomId,
      fileName,
      startTime,
      endTime,
      url,
      thumbnail
    });
      return toast.success(`${fileName} successfully uploaded!`)
    } catch (error) { 
      return toast.error(`${error}`)
    }
  };

  return (
    <>
      <div className="rd__chat-header">
        <h2 className="rd__chat-header__title">Recordings</h2>
        <IconButton
          className="rd__chat-header__icon"
          onClick={onClose}
          icon="close"
        />
      </div>
      <Table>
        <TableCaption>A list of your recent recordings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Recording</TableHead>
            <TableHead className="w-[100px]">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recordings?.map((recording) => (
            <TableRow key={recording.filename}>
              <TableCell className="font-medium text-ellipsis overflow-hidden ... max-w-40">
                {recording.filename}
              </TableCell>
              <TableCell className="font-medium text-ellipsis overflow-hidden ...">
                {calculateDuration(recording.start_time, recording.end_time)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        handleUploadRecording({
                          userId: userId,
                          roomId: roomId,
                          fileName: recording.filename,
                          startTime: recording.start_time,
                          endTime: recording.end_time,
                          url: recording.url,
                        })
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RecordingStream;
