import { CallRecording, CallRecordingList } from "@stream-io/video-react-sdk";
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
import { calculateDuration } from "@/utils/helpers";
import { Upload } from "lucide-react";

const RecordingStream = ({
  recordings,
}: {
  recordings: CallRecording[] | undefined;
  }) => {
  
  const handleUploadRecording = () => { 
    
  }
  
  return (
    <>
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
                    <DropdownMenuItem><Upload className="mr-2 h-4 w-4"/> Upload</DropdownMenuItem>
                    <DropdownMenuItem><Download className="mr-2 h-4 w-4"/>Download</DropdownMenuItem>
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
