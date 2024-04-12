import { VideoStream } from "@/components/video-stream";
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="flex h-full">
      <VideoStream roomId={id} />
    </div>    
  );
}
