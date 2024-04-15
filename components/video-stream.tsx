"use client";

import clsx from "clsx";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallParticipantsList,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
  LivestreamLayout,
  CompositeButton,
  Icon,
} from "@stream-io/video-react-sdk";
import {
  CancelCallButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ScreenShareButton,
  ReactionsButton,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import ChatStream from "./chat-stream";
import { NewMessageNotification } from "./new-message-notification";
import { SidebarContent } from "@/types";
import { StreamChat } from "stream-chat";

interface Props {
  roomId: string;
  host: boolean;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const token = process.env.NEXT_PUBLIC_STREAM_TOKEN!;
const userId = "Darth_Bane";

const user: User = {
  id: userId,
  name: "Nhan Nguyen",
  image: "https://getstream.io/random_svg/?id=nhan&name=Nhan",
};

const anonUser: User = {
  id: "jack-guest",
  type: "guest",
};

export function VideoStream({ roomId, host }: Props) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [call, setCall] = useState<Call | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat>();

  useEffect(() => {
    if (!roomId && host === undefined) return;
    const client = new StreamVideoClient({
      apiKey,
      user: host ? user : anonUser,
      ...(host && { token }),
    });
    const call = client.call("livestream", roomId);
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
      ? client.connectUser(user, token)
      : client.setGuestUser(user);
    
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
    };  }, [apiKey, user.id, token]);

  const [sidebarContent, setSidebarContent] = useState<SidebarContent>(null);
  const showSidebar = sidebarContent != null;
  const showParticipants = sidebarContent === "participants";
  const showChat = sidebarContent === "chat";

  return (
    videoClient &&
    call && (
      <StreamVideo client={videoClient}>
        <StreamTheme>
          <StreamCall call={call}>
            <div className="rd__call">
              <div className="rd__main-call-panel">
                <div className="rd__call-header rd__call-header--active">
                  <div className="rd__call-header__controls-group">
                    <div className="rd__header__elapsed">
                      <span className="str-video__icon str-video__icon--verified rd__header__elapsed-icon"></span>
                      <div className="rd__header__elapsed-time">01:28:21</div>
                    </div>
                    <div className="rd__header__latency">
                      <div className="rd__header__latency-indicator"></div>0 ms
                    </div>
                  </div>
                </div>
                <div className="rd__layout">
                  <div className="rd__layout__stage-container">
                    <LivestreamLayout muted={true} />
                  </div>
                  <div
                    className={clsx(
                      "rd__sidebar",
                      showSidebar && "rd__sidebar--open"
                    )}
                  >
                    {showSidebar && (
                      <div className="rd__sidebar__container">
                        {showParticipants && (
                          <div className="rd__participants">
                            <CallParticipantsList
                              onClose={() => setSidebarContent(null)}
                            />
                          </div>
                        )}
                        {showChat && (
                          <div className="str-video__chat">
                            <ChatStream
                              chatClient={chatClient}
                              channelId={roomId}
                              onClose={() => {
                                setSidebarContent(null);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex center gap-2 items-center justify-between py-[8px] px-[12px] bg-[#101213] w-full rounded-full">
              <div className="flex center gap-2 items-center justify-start flex-1">
                <ScreenShareButton />
              </div>
              <div className="flex center gap-2 items-center justify-center flex-1">
                <ScreenShareButton />
                <ReactionsButton />
                <SpeakingWhileMutedNotification>
                <ToggleAudioPublishingButton />
                </SpeakingWhileMutedNotification>
                <ToggleVideoPublishingButton />
                <CancelCallButton onClick={() => window.close()} />
              </div>
              <div className="flex center gap-2 items-center justify-end flex-1">
                <CompositeButton
                  active={showParticipants}
                  title="Participants"
                  onClick={() => {
                    setSidebarContent(showParticipants ? null : "participants");
                  }}
                >
                  <Icon icon="participants" />
                </CompositeButton>
                <NewMessageNotification
                  chatClient={chatClient}
                  disableOnChatOpen={showChat}
                >
                  <div className="str-chat__chat-button__wrapper">
                    <CompositeButton
                      active={showChat}
                      title="Chat"
                      onClick={() => {
                        setSidebarContent(showChat ? null : "chat");
                      }}
                    >
                      <Icon icon="chat" />
                    </CompositeButton>
                  </div>
                </NewMessageNotification>
              </div>
            </div>
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
