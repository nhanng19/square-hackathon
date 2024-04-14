"use client"

import { VideoStream } from "@/components/video-stream";
import { useSearchParams } from "next/navigation";
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const host = searchParams.get('host') === "true";
  return (
    <div className="flex h-full">
      <VideoStream host={host} roomId={id} />
    </div>    
  );
}
