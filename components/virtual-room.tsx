"use client";

import { VideoStream } from "@/components/video-stream";
import { useSearchParams } from "next/navigation";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Call, StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { DefaultGenerics, OwnUserResponse, StreamChat } from "stream-chat";
import useUser from "@/hooks/useUser";
import { generateUser } from "@/utils/helpers";

const VirtualRoom = ({
  roomId,
  token,
  anon,
  anonToken,
}: {
  roomId: string;
  token: string | undefined;
  anon: User;
  anonToken: string;
}) => {
  const searchParams = useSearchParams();
  const host = searchParams.get("host") === "true";
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [call, setCall] = useState<Call | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat>();
  const { user: userData } = useUser();
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

  useEffect(() => {
    if (!userData) return;
    const user = generateUser(userData);
    const client = new StreamVideoClient({
      apiKey,
      user: host ? user : anon,
      token: host ? token : anonToken,
    });
    const call = client.call("default", roomId);
    call.join({ create: true }).then(() => {
      if (host) {
        call.camera.enable();
        call.microphone.enable();
      } else {
        call.camera.disable();
        call.microphone.disable();
      }
    });
    setVideoClient(client);
    setCall(call);
    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [userData, roomId, host]);

  useEffect(() => {
    if (!userData) return;
    const user = generateUser(userData);
    const client = new StreamChat(apiKey);
    let didUserConnectInterrupt = false;
    const connectionPromise = host
      ? client.connectUser(user as OwnUserResponse<DefaultGenerics>, token)
      : client.connectUser(anon as OwnUserResponse<DefaultGenerics>, anonToken);
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
  }, [userData, apiKey, token]);

  return (
    <VideoStream
      {...{ videoClient, call, chatClient, roomId, host, userData }}
    />
  );
};

export default VirtualRoom;
