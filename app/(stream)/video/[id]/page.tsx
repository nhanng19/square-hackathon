"use client"

import { VideoStream } from "@/components/video-stream";
import { useSearchParams } from "next/navigation";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,

  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { DefaultGenerics, OwnUserResponse, StreamChat } from "stream-chat";
import useUser from "@/hooks/useUser";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const token = process.env.NEXT_PUBLIC_STREAM_TOKEN!;
const userId = process.env.NEXT_PUBLIC_STREAM_USER_ID!;

const user: User = {
  id: userId,
  name: "Nhan Nguyen",
  image: "https://getstream.io/random_svg/?id=nhan&name=Nhan",
};

const anonUser: User = {
  id: "jack-guest",
  type: "guest",
};

export default function Page({ params }: { params: { id: string } }) {
  const { id: roomId } = params;
  const searchParams = useSearchParams();
  const host = searchParams.get('host') === "true";
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [call, setCall] = useState<Call | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat>();
  const { user: userData } = useUser();
  useEffect(() => {
    if (!roomId && host === undefined) return;
    const client = new StreamVideoClient({
      apiKey,
      user: host ? user : anonUser,
      ...(host && { token }),
    });
    const call = client.call("default", roomId);
    if (!host) {
      call.camera.disable();
      call.microphone.disable();
    }
    call.join({ create: true });
    setVideoClient(client);
    setCall(call);
    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [roomId, host]);

  useEffect(() => {
    const client = new StreamChat(apiKey);
    let didUserConnectInterrupt = false;
    const connectionPromise = host
      ? client.connectUser(user as OwnUserResponse<DefaultGenerics>, token)
      : client.setGuestUser(user as OwnUserResponse<DefaultGenerics>);

    connectionPromise.then(() => {
      if (!didUserConnectInterrupt) {
        setChatClient(client);
      }
    });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(undefined);
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log("connection closed");
        });
    };
  }, [apiKey, user.id, token]);

  return (
    <div className="flex h-full">
      <VideoStream {...{videoClient, call, chatClient, roomId, host, userData}} />
    </div>    
  );
}
